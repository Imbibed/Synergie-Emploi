package model

import io.quarkus.hibernate.orm.panache.PanacheEntityBase
import jakarta.persistence.*
import model.static.DrivingLicenseTypes

@Entity
@Table(name = "job_seeker_license")
class JobSeekerDrivingLicense(
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  var id: Long? = null,

  @ManyToOne
  @JoinColumn(name = "job_seeker_id", nullable = false)
  var jobSeeker: JobSeeker = JobSeeker(),

  @ManyToOne
  @JoinColumn(name = "license_id", nullable = false)
  var license: DrivingLicenseTypes = DrivingLicenseTypes()
): PanacheEntityBase()
