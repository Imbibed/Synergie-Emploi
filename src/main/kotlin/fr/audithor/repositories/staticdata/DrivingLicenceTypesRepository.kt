package fr.audithor.repositories.staticdata

import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import model.static.DrivingLicenceTypes

@ApplicationScoped
class DrivingLicenceTypesRepository : PanacheRepository<DrivingLicenceTypes> {
}
