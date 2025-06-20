package fr.audithor.repositories

import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped
import model.static.Roles

@ApplicationScoped
class RolesRepository : PanacheRepository<Roles> {

}
