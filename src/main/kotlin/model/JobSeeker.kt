package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import java.time.LocalDate

class JobSeeker : PanacheEntity() {
  lateinit var person: Person
  lateinit var firstName: String
  lateinit var lastName: String
  lateinit var phoneNumber: String
  lateinit var email: String
  lateinit var registrationDate: LocalDate
  var rgpdConsent: Boolean = false
}
