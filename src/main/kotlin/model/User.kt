package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import io.quarkus.hibernate.orm.panache.PanacheEntityBase
import io.quarkus.security.jpa.Password
import io.quarkus.security.jpa.Username
import jakarta.persistence.*
import model.static.Roles

@Entity
@Table(name = "user")
class User : PanacheEntityBase() {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  var id: Long? = null

  @Username
  lateinit var username: String

  @Password
  lateinit var password: String

  @ManyToOne
  @JoinColumn(name = "role_id", nullable = false)
  lateinit var role: Roles

}
