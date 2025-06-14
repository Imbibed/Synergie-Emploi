package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.Entity

@Entity
class Person : PanacheEntity() {
  lateinit var firstName: String
  lateinit var lastName: String
  var isPartner: Boolean = false
}
