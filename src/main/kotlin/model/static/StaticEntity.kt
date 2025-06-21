package model.static

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.MappedSuperclass

@MappedSuperclass
abstract class StaticEntity<T> : PanacheEntity where T : Enum<T>, T : DescribableEnum {

  @Column(nullable = false, unique = true)
  lateinit var name: String

  @Column(nullable = false)
  lateinit var description: String

  protected constructor()

  constructor(enumValue: T) {
    this.name = enumValue.name
    this.description = enumValue.desc
  }

  override fun equals(other: Any?): Boolean {
    if (this === other) return true
    if (other !is StaticEntity<*>) return false

    if (name != other.name) return false
    if (description != other.description) return false

    return true
  }

  override fun hashCode(): Int {
    var result = name.hashCode()
    result = 31 * result + description.hashCode()
    return result
  }
}
