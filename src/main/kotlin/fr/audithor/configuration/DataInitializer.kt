package fr.audithor.configuration

import fr.audithor.repositories.RolesRepository
import fr.audithor.repositories.UserRepository
import fr.audithor.repositories.staticdata.DrivingLicenceTypesRepository
import fr.audithor.repositories.staticdata.GradesLevelsRepository
import io.quarkus.elytron.security.common.BcryptUtil
import io.quarkus.hibernate.orm.panache.PanacheEntity
import io.quarkus.hibernate.orm.panache.PanacheRepository
import io.quarkus.runtime.Startup
import jakarta.annotation.PostConstruct
import jakarta.enterprise.context.ApplicationScoped
import jakarta.transaction.Transactional
import model.User
import model.static.*
import kotlin.enums.EnumEntries

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

  fun <E : PanacheEntity, T : Enum<T>> insertMissingStaticData(
    existingNames: Set<String>,
    allEnum: EnumEntries<T>,
    entityFactory: (T) -> E,
    repository: PanacheRepository<E>
  ) {
    val toInsert = allEnum.filter { it.name !in existingNames }.map { entityFactory(it) }
    if (toInsert.isNotEmpty()) {
      repository.persist(toInsert)
    }
  }


  @Transactional
  fun initStaticData() {
    //GradesLevels
    insertMissingStaticData(
      gradesLevelsRepository.findAll().list<GradesLevels>().toList().map{ it.name }.toSet(),
      GradesLevel.entries,
      { GradesLevels(it) },
      gradesLevelsRepository
    )

    //DrivingLicenceTypes
    insertMissingStaticData(
      drivingLicenceTypesRepository.findAll().list<DrivingLicenceTypes>().toList().map{ it.name }.toSet(),
      DrivingLicenceType.entries,
      { DrivingLicenceTypes(it) },
      drivingLicenceTypesRepository
    )

    //Roles
    insertMissingStaticData(
      rolesRepository.findAll().list<Roles>().toList().map{ it.name }.toSet(),
      Role.entries,
      { Roles(it) },
      rolesRepository
    )

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
