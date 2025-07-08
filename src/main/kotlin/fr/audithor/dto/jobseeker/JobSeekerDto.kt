package fr.audithor.dto.jobseeker

import model.Gender
import model.JobSeekerStatus

data class JobSeekerDto(
  val id: Long,
  val firstName: String,
  val lastName: String,
  val phoneNumber: String,
  var status: JobSeekerStatus,
  var gender: Gender
)
