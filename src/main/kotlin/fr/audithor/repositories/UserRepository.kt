package fr.audithor.repositories

import fr.audithor.dto.exceptions.UserNotFoundException
import io.quarkus.elytron.security.common.BcryptUtil
import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import model.static.Roles
import model.User

@ApplicationScoped
class UserRepository : PanacheRepository<User> {

  fun findByUsername(username: String): User = find("username", username).firstResult() ?: throw UserNotFoundException("L'utilisateur ${username} n'existe pas.")

  fun add(username: String, password: String, role: Roles) {
    val user = User()
    user.username = username
    user.password = BcryptUtil.bcryptHash(password)
    user.role = role
    persist(user)
  }
}
