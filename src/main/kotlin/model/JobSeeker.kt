package model

import fr.audithor.dto.JobSeekerDto
import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.*
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
  lateinit var licence: Licence
  @OneToMany(mappedBy = "jobSeeker", cascade = [CascadeType.ALL], orphanRemoval = true)
  lateinit var activies: MutableList<JobSeekerActivity>
  @OneToMany(mappedBy = "jobSeeker", cascade = [CascadeType.ALL], orphanRemoval = true)
  lateinit var events: MutableList<JobSeekerEvent>
}

enum class JobSeekerStatus{
  SANS_EMPLOI,
  INCOONU,
  SOUS_CONTRAT
}

enum class Licence {
  PERMIS_A,
  PERMIS_B,
  PERMIS_C,
}
