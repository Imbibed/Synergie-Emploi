package fr.audithor.dto

class PaginationResponse<T> (
  val content: List<T>,
  val totalElements: Long,
  val totalPages: Int,
  val size: Int,
  val pageIndex: Int
)
