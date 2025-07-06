package fr.audithor.repositories

import fr.audithor.dto.jobseeker.JobSeekerDto
import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import model.JobSeeker

@ApplicationScoped
class JobSeekerRepository : PanacheRepository<JobSeeker> {

}
