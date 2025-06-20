package fr.audithor.configuration

import fr.audithor.repositories.RolesRepository
import fr.audithor.repositories.UserRepository
import fr.audithor.repositories.staticdata.DrivingLicenceTypesRepository
import fr.audithor.repositories.staticdata.GradesLevelsRepository
import io.quarkus.elytron.security.common.BcryptUtil
import io.quarkus.runtime.Startup
import jakarta.annotation.PostConstruct
import jakarta.enterprise.context.ApplicationScoped
import jakarta.transaction.Transactional
import model.User
import model.static.*

@Startup
@ApplicationScoped
class DataInitializer(
  private val userRepository: UserRepository,
  private val rolesRepository: RolesRepository,
  private val gradesLevelsRepository: GradesLevelsRepository,
  private val drivingLicenceTypesRepository: DrivingLicenceTypesRepository) {

  @PostConstruct
  fun init() {
    initStaticData()
    initUsers()
  }

  @Transactional
  fun initStaticData() {
    //TODO review this algorithm by persist only the Enum static data
    //GradesLevels
    val gradesLvlSetDB = gradesLevelsRepository.findAll().list<GradesLevels>().toSet()
    val gradesLvlSetEnum = GradesLevel.entries.stream().map { GradesLevels(it) }.toList().toSet()
    (gradesLvlSetEnum - gradesLvlSetDB).takeIf { it.isNotEmpty() } ?.let { gradesLevelsRepository.persist(it) }

    //DrivingLicenceTypes
    val drivingLicenceTypeSetDB = drivingLicenceTypesRepository.findAll().list<DrivingLicenceTypes>().toSet()
    val drivingLicenceTypeSetEnum = DrivingLicenceType.entries.stream().map { DrivingLicenceTypes(it) }.toList().toSet()
    (drivingLicenceTypeSetEnum - drivingLicenceTypeSetDB).takeIf { it.isNotEmpty() } ?.let { drivingLicenceTypesRepository.persist(it) }

    //Roles
    val rolesSetDB = rolesRepository.findAll().list<Roles>().toSet()
    val rolesSetEnum = Role.entries.stream().map {Roles(it)}.toList().toSet()
    (rolesSetEnum - rolesSetDB).takeIf { it.isNotEmpty() } ?.let { rolesRepository.persist(it) }

    //TODO Languages and Skills
  }

  @Transactional
  fun initUsers() {
    if (userRepository.count() == 0L) {
      val hashedPassword = BcryptUtil.bcryptHash("test")

      val adminRole = rolesRepository.find("name", Role.ADMINISTRATEUR.name).firstResult<Roles>()
      val insRole = rolesRepository.find("name", Role.CONSEILLER_INSERTION.name).firstResult<Roles>()
      val accRole = rolesRepository.find("name", Role.AGENT_ACCUEIL.name).firstResult<Roles>()
      val relRole = rolesRepository.find("name", Role.RESPONSABLE_RELATION_PRO.name).firstResult<Roles>()

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
