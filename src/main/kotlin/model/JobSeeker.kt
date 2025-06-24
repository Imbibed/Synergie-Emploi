package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.*
import model.static.DrivingLicenceType
import java.time.LocalDate

@Entity
class JobSeeker : PanacheEntity() {

  @OneToOne(optional = false)
  @JoinColumn(name = "person_id", nullable = false)
  lateinit var person: Person
  lateinit var email: String
  lateinit var registrationDate: LocalDate
  @Enumerated(EnumType.STRING)
  lateinit var status: JobSeekerStatus
  var rgpdConsent: Boolean = false
  @Enumerated(EnumType.STRING)
  lateinit var licence: DrivingLicenceType
}

enum class JobSeekerStatus{
  SANS_EMPLOI,
  INCOONU,
  SOUS_CONTRAT
}
