package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
class JobSeekerEvent : PanacheEntity() {
  lateinit var date: LocalDateTime
  @Enumerated(EnumType.STRING)
  lateinit var eventType: EventType
  lateinit var ref_person: String
  @ManyToOne
  @JoinColumn(name = "job_seeker_id")
  lateinit var jobSeeker: JobSeeker
}

enum class EventType {
  PASSAGE_EN_AGENCE,
  MISE_A_JOUR,
  RENDEZ_VOUS
}
