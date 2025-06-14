package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.Entity

@Entity
class Role : PanacheEntity() {
  lateinit var name: String

}
