package model.static

import jakarta.persistence.Entity

@Entity
class Roles : StaticEntity<Role> {

  constructor() : super()
  constructor(enumValue: Role) : super(enumValue)

}

enum class Role(override val desc: String) : DescribableEnum {
  ADMINISTRATEUR("Administrateur"),
  CONSEILLER_INSERTION("Conseiller insertion"),
  AGENT_ACCUEIL("Agent d'accueil"),
  RESPONSABLE_RELATION_PRO("Responsable relation pro")
}
