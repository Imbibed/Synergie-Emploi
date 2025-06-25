package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import io.quarkus.hibernate.orm.panache.PanacheEntityBase
import jakarta.persistence.*
import model.static.DrivingLicenceType
import java.time.LocalDate

@Entity
@Table(name = "job_seeker")
class JobSeeker() : PanacheEntityBase() {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  var id: Long? = null

  lateinit var firstName: String

  lateinit var lastName: String

  lateinit var phoneNumber: String

  lateinit var email: String

  lateinit var registrationDate: LocalDate

  @Enumerated(EnumType.STRING)
  lateinit var status: JobSeekerStatus

  @Enumerated(EnumType.STRING)
  lateinit var gender: Gender
}

enum class JobSeekerStatus{
  SANS_EMPLOI,
  INCOONU,
  SOUS_CONTRAT
}

enum class Gender {
  HOMME,
  FEMME
}
