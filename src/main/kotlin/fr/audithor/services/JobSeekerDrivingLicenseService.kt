package fr.audithor.services

import fr.audithor.repositories.JobSeekerDrivingLicenseRepository
import fr.audithor.repositories.staticdata.DrivingLicenceTypesRepository
import jakarta.enterprise.context.ApplicationScoped
import model.JobSeekerDrivingLicense
import model.static.DrivingLicenseTypes

@ApplicationScoped
class JobSeekerDrivingLicenseService(
  private val jobSeekerDrivingLicenseRepository: JobSeekerDrivingLicenseRepository,
  private val drivingLicenceTypesRepository: DrivingLicenceTypesRepository) {

  fun findDrivingLicenseTypeByName(name: String): DrivingLicenseTypes {
    return drivingLicenceTypesRepository.find("name", name).firstResult() ?: throw IllegalArgumentException("License inconnu: $name")
  }

  fun addJobSeekerDrivingLicense(jobSeekerDrinvingLicense: JobSeekerDrivingLicense) {
    jobSeekerDrivingLicenseRepository.persist(jobSeekerDrinvingLicense)
  }
}
