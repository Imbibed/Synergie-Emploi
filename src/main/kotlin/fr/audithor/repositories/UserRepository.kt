package fr.audithor.repositories

import io.quarkus.elytron.security.common.BcryptUtil
import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import model.Role
import model.User

@ApplicationScoped
class UserRepository : PanacheRepository<User> {

  fun findByUsername(username: String): User = find("username", username).firstResult()

  fun add(username: String, password: String, role: Role) {
    val user = User()
    user.username = username
    user.password = BcryptUtil.bcryptHash(password)
    user.role = role
    user.persist()
  }
}
