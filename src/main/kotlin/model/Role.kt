package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.Entity

@Entity
class Role : PanacheEntity() {
  lateinit var name: RoleName

}

enum class RoleName {
  ADMINISTRATEUR,
  CONSEILLER_INSERTION,
  AGENT_ACCUEIL,
  RESPONSABLE_RELATION_PRO
}
