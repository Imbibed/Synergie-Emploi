package fr.audithor.services

import fr.audithor.dto.UsernameAndRole
import fr.audithor.repositories.UserRepository
import jakarta.enterprise.context.ApplicationScoped
import model.User

@ApplicationScoped
class UserService(val userRepository: UserRepository) {

  fun findByUsername(username: String): User = userRepository.findByUsername(username)

  fun getUserRoleByUsername(username: String): UsernameAndRole {
    val user = findByUsername(username)
    return UsernameAndRole(user.username, user.role)
  }
}
