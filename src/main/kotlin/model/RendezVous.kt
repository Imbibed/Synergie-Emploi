package model

import io.quarkus.hibernate.orm.panache.PanacheEntity
import jakarta.persistence.Entity
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import java.time.LocalDateTime

@Entity
class RendezVous : PanacheEntity() {

  @ManyToOne(optional = false)
  @JoinColumn(name = "job_seeker_id")
  lateinit var jobSeeker: JobSeeker

  lateinit var date: LocalDateTime

  lateinit var reason: String

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id")
  lateinit var user: User
}
