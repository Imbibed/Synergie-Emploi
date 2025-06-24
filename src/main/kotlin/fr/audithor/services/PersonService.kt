package fr.audithor.services

import fr.audithor.repositories.PersonRepository
import jakarta.enterprise.context.ApplicationScoped
import model.Person

@ApplicationScoped
class PersonService(private val personRepository: PersonRepository) {
  fun addPerson(person: Person) {
    personRepository.persist(person)
  }
}
