package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.Entity
import jakarta.persistence.JoinColumn
import jakarta.persistence.OneToOne

@Entity
class Partner : PanacheEntity() {

  lateinit var companyName: String
  lateinit var contact: String
  lateinit var address: String
  lateinit var email: String
  lateinit var businessSector: String
}
