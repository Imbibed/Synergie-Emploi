package fr.audithor.services

import fr.audithor.dto.DtoMapper
import fr.audithor.dto.JobSeekerDto
import fr.audithor.repositories.JobSeekerRepository
import io.quarkus.panache.common.Page
import jakarta.enterprise.context.ApplicationScoped
import model.JobSeeker

@ApplicationScoped
class JobSeekerService(private val jobSeekerRepository: JobSeekerRepository) {
  fun getAllLazy(page: Int, size: Int): List<JobSeekerDto> {
    val jobSeekers = jobSeekerRepository.findAll().page<JobSeeker>(Page.of(page, size)).list<JobSeeker>()
    return jobSeekers.map { DtoMapper.toDto(it) }
  }

  fun getJobSeekerById(id: Long): JobSeeker {
    return jobSeekerRepository.findById(id)
  }
}
