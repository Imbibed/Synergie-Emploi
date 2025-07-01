package fr.audithor.repositories.staticdata

import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import model.static.DrivingLicenseTypes

@ApplicationScoped
class DrivingLicenceTypesRepository : PanacheRepository<DrivingLicenseTypes> {
}
