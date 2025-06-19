package fr.audithor.services

import fr.audithor.dto.UsernameAndRole
import io.quarkus.elytron.security.common.BcryptUtil
import io.smallrye.jwt.build.Jwt
import jakarta.enterprise.context.ApplicationScoped
import java.time.Instant

@ApplicationScoped
class LoginService(val userService: UserService) {

  fun verifyCredentials(username: String, password: String): Boolean {
    val user = this.userService.findByUsername(username)
    return BcryptUtil.matches(password, user.password)
  }

  fun generateToken(usernameAndRole: UsernameAndRole): String {
    val claims = Jwt.claims()
      .issuer("https://audithor.local")
      .subject(usernameAndRole.username)
      .groups(setOf(usernameAndRole.role.name.name))
      .expiresAt(Instant.now().plusSeconds(3600))
    return claims.sign()
  }

  fun getUserRoleByUsername(username: String): UsernameAndRole = userService.getUserRoleByUsername(username)
}
