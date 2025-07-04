package fr.audithor.repositories.staticdata

import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import model.static.GradesLevels

@ApplicationScoped
class GradesLevelsRepository : PanacheRepository<GradesLevels> {
}
