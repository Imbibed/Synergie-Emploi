package fr.audithor.repositories

import fr.audithor.dto.JobSeekerDto
import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import model.JobSeeker

@ApplicationScoped
class JobSeekerRepository : PanacheRepository<JobSeeker> {
  fun toDto(jobSeeker: JobSeeker): JobSeekerDto {
    jobSeeker.id?.let {
      return JobSeekerDto(
        id = it,
        jobSeeker.firstName,
        jobSeeker.lastName,
        jobSeeker.phoneNumber,
        jobSeeker.status,
        jobSeeker.gender
        )
    } ?: throw Exception("")
  }
}
