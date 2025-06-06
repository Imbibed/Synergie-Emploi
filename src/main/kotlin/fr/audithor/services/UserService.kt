package fr.audithor.services

import fr.audithor.dto.UserRole
import fr.audithor.repositories.UserRepository
import jakarta.enterprise.context.ApplicationScoped
import model.User

@ApplicationScoped
class UserService(val userRepository: UserRepository) {

  fun findByUsername(username: String): User = userRepository.findByUsername(username)

  fun getUserRoleByUsername(username: String): UserRole {
    val user = findByUsername(username)
    return UserRole(user.username, user.role)
  }
}
