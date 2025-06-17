package fr.audithor.dto

import model.JobSeeker

class DtoMapper {
  companion object {
    fun toDto(jobSeeker: JobSeeker): JobSeekerDto {
      return JobSeekerDto(
        firstName = jobSeeker.person.firstName,
        lastName = jobSeeker.person.lastName,
        registrationDate = jobSeeker.registrationDate,
        phoneNumber = jobSeeker.person.phoneNumber
      )
    }
  }
}
