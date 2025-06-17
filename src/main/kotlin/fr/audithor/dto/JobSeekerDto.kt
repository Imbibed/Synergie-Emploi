package fr.audithor.dto

import java.time.LocalDate

data class JobSeekerDto(
  val firstName: String,
  val lastName: String,
  val phoneNumber: String,
  val registrationDate: LocalDate
)
