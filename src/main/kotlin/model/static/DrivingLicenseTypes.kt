package model.static

import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "stc_driving_licence")
class DrivingLicenseTypes : StaticEntity<DrivingLicenseType> {
  constructor() : super()
  constructor(enumValue: DrivingLicenseType) : super(enumValue)
}

enum class DrivingLicenseType(override val desc: String) : DescribableEnum {
  AM("Permis AM - Cyclomoteur"),
  A("Permis A - Moto"),
  A1("Permis A1 - Moto"),
  A2("Permis A2 - Moto"),
  C("Permis C - Transport Marchandises/Matériels"),
  C1("Permis C1 - Transport Marchandises/Matériels"),
  C1E("Permis C1E - Transport Marchandises/Matériels"),
  D("Permis D - Transport en Commun"),
  E("Permis E - (BE, CE, DE)"),
  NOT_ALLOWED("Retrait ou Supendu"),
  NONE("Sans permis"),
  B("Permis auto")
}
