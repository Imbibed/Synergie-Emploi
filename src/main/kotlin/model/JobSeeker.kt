package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.Entity
import jakarta.persistence.JoinColumn
import jakarta.persistence.OneToOne
import java.time.LocalDate
@Entity
class JobSeeker : PanacheEntity() {

  @OneToOne(optional = false)
  @JoinColumn(name = "person_id", nullable = false)
  lateinit var person: Person

  lateinit var firstName: String
  lateinit var lastName: String
  lateinit var phoneNumber: String
  lateinit var email: String
  lateinit var registrationDate: LocalDate
  var rgpdConsent: Boolean = false
}
