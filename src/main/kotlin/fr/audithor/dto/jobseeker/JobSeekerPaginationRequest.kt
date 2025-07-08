package fr.audithor.dto.jobseeker

data class JobSeekerPaginationRequest(
  val pageSize: Int,
  val pageIndex: Int,
  val jobSeekerFilter: JobSeekerFilter? = null
)
