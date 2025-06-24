package fr.audithor.services

import fr.audithor.dto.DtoMapper
import fr.audithor.dto.JobSeekerDto
import fr.audithor.repositories.JobSeekerRepository
import io.quarkus.panache.common.Page
import jakarta.enterprise.context.ApplicationScoped
import jakarta.transaction.Transactional
import model.JobSeeker
import org.eclipse.microprofile.config.inject.ConfigProperty
import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader

@ApplicationScoped
class JobSeekerService(private val jobSeekerRepository: JobSeekerRepository) {

  @ConfigProperty(name = "jobseeker.file.import")
  lateinit var jobseekerImportFilePath: String

  @Transactional
  fun getAllLazy(page: Int, size: Int): List<JobSeekerDto> {
    val jobSeekers = jobSeekerRepository.findAll().page<JobSeeker>(Page.of(page, size)).list<JobSeeker>()
    return jobSeekers.map { DtoMapper.toDto(it) }
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
    if(lines.isEmpty()) {
      //TODO throw Exception
    }
    val header = lines.first().split(",")
    val expectedHeader = listOf("gender","nom","prenom","qpv","activity","dernierRdv","licence","status","action-edit")
    if(header.map{it.trim()} != expectedHeader){
      //TODO throw Exception
    }

  }
}
