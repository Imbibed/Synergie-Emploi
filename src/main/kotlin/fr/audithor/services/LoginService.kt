package fr.audithor.services

import fr.audithor.dto.UserRole
import io.quarkus.elytron.security.common.BcryptUtil
import jakarta.enterprise.context.ApplicationScoped

@ApplicationScoped
class LoginService(val userService: UserService) {
  fun verifyCredentials(username: String, password: String): Boolean {
    val user = this.userService.findByUsername(username)
    return BcryptUtil.matches(password, user.password)
  }

  fun generateToken(userRole: UserRole): String {
    return ""
  }

  fun getUserRoleByUsername(username: String): UserRole = userService.getUserRoleByUsername(username)
}
