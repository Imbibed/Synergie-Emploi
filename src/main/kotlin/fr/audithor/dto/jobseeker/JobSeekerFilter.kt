package fr.audithor.dto.jobseeker

import model.Gender
import model.JobSeekerStatus

data class JobSeekerFilter(
  val firstName: String? = null,
  val lastName: String? = null,
  val gender: String? = null,
  val phoneNumber: String? = null,
  val status: String? = null
)
