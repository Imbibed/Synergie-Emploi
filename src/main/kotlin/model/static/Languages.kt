package model.static

class Languages : StaticEntity<Language> {
  constructor() : super()
  constructor(enumValue: Language) : super(enumValue)
}

enum class Language(override val desc: String) : DescribableEnum {
  CHNOIS("zh-CN"),
  ESPAGNOL("es-ES"),
  ANGLAIS("en-US"),
  HINDI("hi-IN"),
  ARABE("ar-SA"),
  BENGALI("bn-BD"),
  PORTUGAIS("pt-BR"),
  RUSSE("ru-RU"),
  JAPONAIS("ja-JP"),
  PANJABI("pa-IN"),
  ALLEMAND("de-DE"),
  JAVANAIS("jv-ID"),
  COREEN("ko-KR"),
  FRANCAIS("fr-FR"),
  TELOUGOU("te-IN"),
  VIETNAMIN("vi-VN"),
  MARATHI("mr-IN"),
  TURC("tr-TR"),
  TAMOUL("ta-IN"),
  OURDOU("ur-PK")
}
