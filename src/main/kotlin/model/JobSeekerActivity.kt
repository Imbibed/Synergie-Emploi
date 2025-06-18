package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import java.time.LocalDate

class JobSeekerActivity : PanacheEntity() {
  lateinit var startDate: LocalDate
  lateinit var endDate: LocalDate
  lateinit var type: ActivityType
  lateinit var comment: String
}

enum class ActivityType {
  FORMATION,
  TRAVAIL
}
