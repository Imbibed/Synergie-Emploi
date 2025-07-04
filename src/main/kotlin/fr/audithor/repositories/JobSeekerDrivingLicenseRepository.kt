package fr.audithor.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped;
import model.JobSeekerDrivingLicense

@ApplicationScoped
class JobSeekerDrivingLicenseRepository : PanacheRepository<JobSeekerDrivingLicense> {
}
