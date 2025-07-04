package fr.audithor.services

import fr.audithor.dto.JobSeekerDto
import fr.audithor.dto.PaginationResponse
import fr.audithor.dto.exceptions.FileEmptyException
import fr.audithor.dto.exceptions.WrongFileHeaderException
import fr.audithor.repositories.JobSeekerDrivingLicenseRepository
import fr.audithor.repositories.JobSeekerRepository
import io.quarkus.panache.common.Page
import jakarta.enterprise.context.ApplicationScoped
import jakarta.transaction.Transactional
import model.Gender
import model.JobSeeker
import model.JobSeekerDrivingLicense
import model.JobSeekerStatus
import org.eclipse.microprofile.config.inject.ConfigProperty
import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader
import java.time.LocalDate
import kotlin.math.ceil

@ApplicationScoped
class JobSeekerService(
  private val jobSeekerRepository: JobSeekerRepository,
  private val jobSeekerDrivingLicenseService: JobSeekerDrivingLicenseService
) {

  @ConfigProperty(name = "jobseeker.file.import")
  lateinit private var jobseekerImportFilePath: String

  @ConfigProperty(name = "jobseeker.file.import.header")
  lateinit private var jobseekerImportFilePathHeader: String

  @Transactional
  fun getAllLazy(pageIndex: Int, size: Int): PaginationResponse<JobSeekerDto> {
    val jobSeekers = jobSeekerRepository.findAll().page<JobSeeker>(Page.of(pageIndex, size)).list<JobSeeker>()
    val total = jobSeekerRepository.count()
    val totalPages = if (total == 0L) 0 else ceil(total.toDouble() / size).toInt()
    return PaginationResponse(
      content = jobSeekers.map { jobSeekerRepository.toDto(it) },
      totalElements = total,
      totalPages = totalPages,
      size = size,
      pageIndex = pageIndex
    )
  }

  @Transactional
  fun getJobSeekerById(id: Long): JobSeeker {
    return jobSeekerRepository.findById(id)
  }

  @Transactional
  fun importJobSeekerByCsvFile() {
    val inputStream = File(jobseekerImportFilePath).inputStream()
    val reader = BufferedReader(InputStreamReader(inputStream, Charsets.UTF_8))
    val lines = reader.readLines()
    if (lines.isEmpty()) {
      throw FileEmptyException(jobseekerImportFilePath.split("/").last())
    }
    val header = lines.first().split(",")
    val expectedHeader = jobseekerImportFilePathHeader.split(",")
    if (header.map { it.trim() } != expectedHeader) {
      throw WrongFileHeaderException(lines.first(), jobseekerImportFilePathHeader)
    }
    lines.drop(1).forEach {
      val parts = it.split(",")
      val jobSeeker = JobSeeker(
        gender = getJobSeekerGender(parts.getOrNull(0)?.trim()),
        lastName = parts.getOrNull(1)?.trim() ?: "",
        firstName = parts.getOrNull(2)?.trim() ?: "",
        phoneNumber = parts.getOrNull(3)?.trim() ?: "",
        email = parts.getOrNull(4)?.trim() ?: "",
        status = getJobSeekerStatusEnum(parts.getOrNull(5)?.trim()),
        registrationDate = LocalDate.now()
      )
      jobSeekerRepository.persist(jobSeeker)

      val drivingLicenses = parts.getOrNull(6)?.trim()?.split(" ") ?: emptyList()

      drivingLicenses.forEach { name ->
        val license = jobSeekerDrivingLicenseService.findDrivingLicenseTypeByName(name)

        val jobSeekerLicense = JobSeekerDrivingLicense(jobSeeker = jobSeeker, license = license)

        jobSeekerDrivingLicenseService.addJobSeekerDrivingLicense(jobSeekerLicense)
      }
    }

  }

  private fun getJobSeekerGender(value: String?): Gender {
    return value?.let {
      when (it) {
        "M." -> Gender.HOMME
        else -> Gender.FEMME
      }
    } ?: Gender.FEMME
  }

  private fun getJobSeekerStatusEnum(value: String?): JobSeekerStatus {
    return value?.let {
      when (it) {
        "Sans Emploi" -> JobSeekerStatus.SANS_EMPLOI
        "Sous contrat" -> JobSeekerStatus.SOUS_CONTRAT
        else -> JobSeekerStatus.INCONNU
      }
    } ?: JobSeekerStatus.INCONNU
  }
}
