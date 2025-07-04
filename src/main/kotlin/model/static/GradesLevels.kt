package model.static

import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "stc_grades_levels")
class GradesLevels : StaticEntity<GradesLevel> {
  constructor() : super()
  constructor(enumValue: GradesLevel) : super(enumValue)
}

enum class GradesLevel(override val desc: String) : DescribableEnum {
  NIVEAU_1("Niveau 1"),
  NIVEAU_2("Niveau 2"),
  NIVEAU_3("Niveau 3"),
  NIVEAU_4("Niveau 4"),
  NIVEAU_5("Niveau 5"),
  NIVEAU_6("Niveau 6"),
}
