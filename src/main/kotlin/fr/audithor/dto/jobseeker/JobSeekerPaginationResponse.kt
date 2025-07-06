package fr.audithor.dto.jobseeker

class JobSeekerPaginationResponse (
  val content: List<JobSeekerDto>,
  val totalElements: Long,
  val totalPages: Int,
  val pageSize: Int,
  val pageIndex: Int
)
