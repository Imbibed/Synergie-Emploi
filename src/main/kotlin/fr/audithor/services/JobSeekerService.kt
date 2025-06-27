package fr.audithor.services

import fr.audithor.dto.JobSeekerDto
import fr.audithor.dto.exceptions.FileEmptyException
import fr.audithor.dto.exceptions.WrongFileHeaderException
import fr.audithor.repositories.JobSeekerRepository
import io.quarkus.panache.common.Page
import jakarta.enterprise.context.ApplicationScoped
import jakarta.transaction.Transactional
import model.Gender
import model.JobSeeker
import model.JobSeekerStatus
import org.eclipse.microprofile.config.inject.ConfigProperty
import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader
import java.time.LocalDate

@ApplicationScoped
class JobSeekerService(private val jobSeekerRepository: JobSeekerRepository) {

  @ConfigProperty(name = "jobseeker.file.import")
  lateinit private var jobseekerImportFilePath: String

  @ConfigProperty(name = "jobseeker.file.import.header")
  lateinit private var jobseekerImportFilePathHeader: String

  @Transactional
  fun getAllLazy(page: Int, size: Int): List<JobSeekerDto> {
    val jobSeekers = jobSeekerRepository.findAll().page<JobSeeker>(Page.of(page, size)).list<JobSeeker>()
    return listOf()//jobSeekers.map { DtoMapper.toDto(it) }
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
    val jobSeekers = lines.drop(1).map {
      val parts = it.split(",")
      JobSeeker(
        gender = getJobSeekerGender(parts.getOrNull(0)?.trim()),
        lastName = parts.getOrNull(1)?.trim() ?: "",
        firstName = parts.getOrNull(2)?.trim() ?: "",
        phoneNumber = parts.getOrNull(3)?.trim() ?: "",
        email = parts.getOrNull(4)?.trim() ?: "",
        status = getJobSeekerStatusEnum(parts.getOrNull(5)?.trim()),
        registrationDate = LocalDate.now()
      )
    }
    jobSeekerRepository.persist(jobSeekers)
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
