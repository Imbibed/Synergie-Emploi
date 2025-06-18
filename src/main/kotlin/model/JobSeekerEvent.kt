package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.Entity
import java.time.LocalDateTime

@Entity
class JobSeekerEvent : PanacheEntity() {
  lateinit var date: LocalDateTime
  lateinit var eventType: EventType
}

enum class EventType {
  PASSAGE_EN_AGENCE,
  MISE_A_JOUR
}
