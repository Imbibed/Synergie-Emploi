package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import io.quarkus.security.jpa.Password
import io.quarkus.security.jpa.Roles
import io.quarkus.security.jpa.Username
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated

@Entity
class User() : PanacheEntity() {
  @Username
  lateinit var username: String

  @Password
  lateinit var password: String

  @Roles
  @Enumerated(EnumType.STRING)
  lateinit var role: Role

}

enum class Role {
  ADMINISTRATEUR,
  CONSEILLER_INSERTION,
  AGENT_ACCUEIL,
  RESPONSABLE_RELATION_PRO
}
