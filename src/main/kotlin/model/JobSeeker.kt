package model

import io.quarkus.hibernate.orm.panache.PanacheEntityBase
import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "job_seeker")
class JobSeeker(
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  var id: Long? = null,
  var firstName: String = "",
  var lastName: String = "",
  var phoneNumber: String = "",
  var email: String = "",
  var registrationDate: LocalDate = LocalDate.now(),
  @Enumerated(EnumType.STRING)
  var status: JobSeekerStatus = JobSeekerStatus.INCONNU,
  @Enumerated(EnumType.STRING)
  var gender: Gender = Gender.FEMME
) : PanacheEntityBase()

enum class JobSeekerStatus{
  SANS_EMPLOI,
  INCONNU,
  SOUS_CONTRAT
}

enum class Gender {
  HOMME,
  FEMME
}
