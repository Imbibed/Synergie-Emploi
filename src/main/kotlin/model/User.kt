package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import io.quarkus.security.jpa.Password
import io.quarkus.security.jpa.Username
import jakarta.persistence.Entity
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import model.static.Roles

@Entity
class User : PanacheEntity() {

  @Username
  lateinit var username: String

  @Password
  lateinit var password: String

  @ManyToOne
  @JoinColumn(name = "role_id", nullable = false)
  lateinit var role: Roles

}
