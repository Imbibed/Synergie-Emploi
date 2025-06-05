package model

import io.quarkus.hibernate.orm.panache.PanacheEntity

class Person : PanacheEntity() {
  var isPartner: Boolean = false
}
