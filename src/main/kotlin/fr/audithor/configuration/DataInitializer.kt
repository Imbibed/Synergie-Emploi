package fr.audithor.configuration

import fr.audithor.repositories.RoleRepository
import fr.audithor.repositories.UserRepository
import io.quarkus.elytron.security.common.BcryptUtil
import io.quarkus.runtime.Startup
import jakarta.annotation.PostConstruct
import jakarta.enterprise.context.ApplicationScoped
import jakarta.transaction.Transactional
import model.Role
import model.RoleName
import model.User

@Startup
@ApplicationScoped
class DataInitializer(
  private val userRepository: UserRepository,
  private val roleRepository: RoleRepository) {

  @PostConstruct
  fun init() {
    initRoles()
    initUsers()
  }

  @Transactional
  fun initRoles() {
    if(roleRepository.count() == 0L) {
      val roleAdmin = Role().apply {
        name = RoleName.ADMINISTRATEUR
      }
      val roleIns = Role().apply {
        name = RoleName.CONSEILLER_INSERTION
      }
      val roleAcc = Role().apply {
        name = RoleName.AGENT_ACCUEIL
      }
      val roleRel = Role().apply {
        name = RoleName.RESPONSABLE_RELATION_PRO
      }
      roleRepository.persist(roleAdmin,roleIns,roleAcc,roleRel)
    }
  }

  @Transactional
  fun initUsers() {
    if (userRepository.count() == 0L) {
      val hashedPassword = BcryptUtil.bcryptHash("test")

      val adminRole = roleRepository.find("name", RoleName.ADMINISTRATEUR).firstResult<Role>()
      val insRole = roleRepository.find("name", RoleName.CONSEILLER_INSERTION).firstResult<Role>()
      val accRole = roleRepository.find("name", RoleName.AGENT_ACCUEIL).firstResult<Role>()
      val relRole = roleRepository.find("name", RoleName.RESPONSABLE_RELATION_PRO).firstResult<Role>()

      val admin = User().apply {
        username = "admin_user"
        password = hashedPassword
        role = adminRole
      }

      val ins = User().apply {
        username = "ins_user"
        password = hashedPassword
        role = insRole
      }

      val acc = User().apply {
        username = "acc_user"
        password = hashedPassword
        role = accRole
      }

      val rel = User().apply {
        username = "rel_user"
        password = hashedPassword
        role = relRole
      }

      userRepository.persist(admin,ins,acc,rel)
    }
  }
}
