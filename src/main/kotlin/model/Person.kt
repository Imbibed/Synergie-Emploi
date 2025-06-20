package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated

@Entity
class Person : PanacheEntity() {
  lateinit var firstName: String
  lateinit var lastName: String
  lateinit var phoneNumber: String
  var isPartner: Boolean = false
  @Enumerated(EnumType.STRING)
  lateinit var gender: Gender
}

enum class Gender {
  HOMME,
  FEMME
}
