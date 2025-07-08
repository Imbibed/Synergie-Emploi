package fr.audithor.dto.jobseeker

import model.Gender
import model.JobSeekerStatus

data class JobSeekerFilter(
  val firstName: String? = null,
  val lastName: String? = null,
  val gender: Gender? = null,
  val phoneNumber: String? = null,
  val status: JobSeekerStatus? = null
)
