package fr.audithor.configuration

import fr.audithor.repositories.RoleRepository
import fr.audithor.repositories.UserRepository
import io.quarkus.elytron.security.common.BcryptUtil
import io.quarkus.runtime.Startup
import jakarta.annotation.PostConstruct
import jakarta.enterprise.context.ApplicationScoped
import jakarta.transaction.Transactional
import model.Role
import model.User

@Startup
@ApplicationScoped
class DataInitializer(
  private val userRepository: UserRepository,
  private val roleRepository: RoleRepository) {

  companion object {
    const val ADMIN_ROLE_NAME = "Administrateur"
    const val INS_ROLE_NAME = "Conseiller Insertion"
    const val ACC_ROLE_NAME = "Agent Accueil"
    const val REL_ROLE_NAME = "Responsable Relation Pro"
  }

  @PostConstruct
  fun init() {
    initRoles()
    initUsers()
  }

  @Transactional
  fun initRoles() {
    if(roleRepository.count() == 0L) {
      val roleAdmin = Role().apply {
        name = ADMIN_ROLE_NAME
      }
      val roleIns = Role().apply {
        name = INS_ROLE_NAME
      }
      val roleAcc = Role().apply {
        name = ACC_ROLE_NAME
      }
      val roleRel = Role().apply {
        name = REL_ROLE_NAME
      }

      roleIns.name = INS_ROLE_NAME

      roleAcc.name = ACC_ROLE_NAME

      roleRel.name = REL_ROLE_NAME
      roleRepository.persist(roleAdmin,roleIns,roleAcc,roleRel)
    }
  }

  @Transactional
  fun initUsers() {
    if (userRepository.count() == 0L) {
      val hashedPassword = BcryptUtil.bcryptHash("test")

      val adminRole = roleRepository.find("name", ADMIN_ROLE_NAME).firstResult<Role>()
      val insRole = roleRepository.find("name", INS_ROLE_NAME).firstResult<Role>()
      val accRole = roleRepository.find("name", ACC_ROLE_NAME).firstResult<Role>()
      val relRole = roleRepository.find("name", REL_ROLE_NAME).firstResult<Role>()

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
