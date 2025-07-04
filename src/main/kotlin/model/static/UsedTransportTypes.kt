package model.static

import jakarta.persistence.Entity

@Entity
class UsedTransportTypes : StaticEntity<UsedTransportType> {
  constructor() : super()
  constructor(enumValue: UsedTransportType) : super(enumValue)
}

enum class UsedTransportType(override val desc: String) : DescribableEnum {
  VOITURE_PERSO("Voiture perso."),
  COVOITURAGE("Covoiturage"),
  VELO("Velo"),
  TRANSPRT_ADAPTE("Transport Adapte"),
  TRANSPORT_COMMUN("Transport en commun")
}
