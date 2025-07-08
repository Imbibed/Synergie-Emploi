package fr.audithor.services

import fr.audithor.dto.jobseeker.JobSeekerDto
import fr.audithor.dto.jobseeker.JobSeekerPaginationResponse
import fr.audithor.dto.exceptions.FileEmptyException
import fr.audithor.dto.exceptions.WrongFileHeaderException
import fr.audithor.dto.jobseeker.JobSeekerPaginationRequest
import fr.audithor.repositories.JobSeekerRepository
import io.quarkus.panache.common.Page
import jakarta.enterprise.context.ApplicationScoped
import jakarta.persistence.EntityManager
import jakarta.persistence.PersistenceContext
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

  @PersistenceContext
  lateinit var entityManager: EntityManager

  @ConfigProperty(name = "jobseeker.file.import")
  lateinit private var jobseekerImportFilePath: String

  @ConfigProperty(name = "jobseeker.file.import.header")
  lateinit private var jobseekerImportFilePathHeader: String

  @Transactional
  fun getAllLazy(req: JobSeekerPaginationRequest): JobSeekerPaginationResponse {
    val pageIndex = req.pageIndex
    val size = req.pageSize
    val filter = req.jobSeekerFilter

    val baseQuery = StringBuilder("FROM JobSeeker js WHERE 1=1")

    val query = StringBuilder("SELECT js $baseQuery")
    val countQuery = StringBuilder("SELECT COUNT(js) $baseQuery")

    val params = mutableMapOf<String, Any>()

    filter?.firstName?.takeIf { it.isNotBlank() }?.let {
      query.append(" AND LOWER(js.firstName) LIKE LOWER(CONCAT(:firstName, '%'))")
      countQuery.append(" AND LOWER(js.firstName) LIKE LOWER(CONCAT(:firstName, '%'))")
      params["firstName"] = it
    }

    filter?.lastName?.takeIf { it.isNotBlank() }?.let {
      query.append(" AND LOWER(js.lastName) LIKE LOWER(CONCAT(:lastName, '%'))")
      countQuery.append(" AND LOWER(js.lastName) LIKE LOWER(CONCAT(:lastName, '%'))")
      params["lastName"] = it
    }

    filter?.gender?.takeIf { it.isNotBlank() }?.let {
      query.append(" AND js.gender = :gender")
      countQuery.append(" AND js.gender = :gender")
      params["gender"] = Gender.valueOf(it)
    }

    filter?.phoneNumber?.takeIf { it.isNotBlank() }?.let {
      query.append(" AND LOWER(js.phoneNumber) LIKE LOWER(CONCAT(:phoneNumber, '%'))")
      countQuery.append(" LOWER(js.phoneNumber) LIKE LOWER(CONCAT(:phoneNumber, '%'))")
      params["phoneNumber"] = it
    }

    filter?.status?.takeIf { it.isNotBlank() }?.let {
      query.append(" AND js.status = :status")
      countQuery.append(" AND js.status = :status")
      params["status"] = JobSeekerStatus.valueOf(it)
    }

    val queryResult = entityManager.createQuery(query.toString(), JobSeeker::class.java)
    val countQueryResult = entityManager.createQuery(countQuery.toString(), Long::class.java)

    params.forEach{ (k,v) ->
      queryResult.setParameter(k, v)
      countQueryResult.setParameter(k, v)
    }

    val total = countQueryResult.singleResult
    val jobSeekers = queryResult.setFirstResult(pageIndex * size).setMaxResults(size).resultList

    val totalPages = if (total == 0L) 0 else ceil(total.toDouble() / size).toInt()

    return JobSeekerPaginationResponse(
      content = jobSeekers.map { toDto(it) },
      totalElements = total,
      totalPages = totalPages,
      pageSize = size,
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
