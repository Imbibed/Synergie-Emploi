package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated

@Entity
class Role : PanacheEntity() {

  @Enumerated(EnumType.STRING)
  lateinit var name: RoleName

}

enum class RoleName {
  ADMINISTRATEUR,
  CONSEILLER_INSERTION,
  AGENT_ACCUEIL,
  RESPONSABLE_RELATION_PRO
}
