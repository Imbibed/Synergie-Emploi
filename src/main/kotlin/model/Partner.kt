package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.Entity

@Entity
class Partner : PanacheEntity() {
  lateinit var person: Person
  lateinit var companyName: String
  lateinit var contact: String
  lateinit var address: String
  lateinit var email: String
  lateinit var phoneNumber: String
  lateinit var businessSector: String
}
