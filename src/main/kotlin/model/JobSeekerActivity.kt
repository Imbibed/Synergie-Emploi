package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import java.time.LocalDate

@Entity
class JobSeekerActivity : PanacheEntity() {
  lateinit var startDate: LocalDate
  lateinit var endDate: LocalDate
  @Enumerated(EnumType.STRING)
  lateinit var type: ActivityType
  lateinit var comment: String
  @ManyToOne
  @JoinColumn(name = "job_seeker_id")
  lateinit var jobSeeker: JobSeeker
}

enum class ActivityType {
  FORMATION,
  TRAVAIL
}
