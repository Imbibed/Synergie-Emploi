package fr.audithor.controlers

import fr.audithor.dto.jobseeker.JobSeekerDto
import fr.audithor.dto.jobseeker.JobSeekerPaginationRequest
import fr.audithor.dto.jobseeker.JobSeekerPaginationResponse
import fr.audithor.services.JobSeekerService
import jakarta.annotation.security.RolesAllowed
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import model.JobSeeker

@Path("/api/jobseeker")
class JobSeekerResource(private val jobSeekerService: JobSeekerService) {

  @POST
  @RolesAllowed("ADMINISTRATEUR", "CONSEILLER_INSERTION", "AGENT_ACCUEIL", "RESPONSABLE_RELATION_PRO")
  @Produces(MediaType.APPLICATION_JSON)
  fun getAllLazy(req: JobSeekerPaginationRequest): Response {
    val paginationResponse: JobSeekerPaginationResponse = jobSeekerService.getAllLazy(req)
    return Response.ok(paginationResponse).build()
  }

  @GET
  @Path("/{jobSeekerId}")
  @RolesAllowed("ADMINISTRATEUR", "CONSEILLER_INSERTION", "AGENT_ACCUEIL", "RESPONSABLE_RELATION_PRO")
  @Produces(MediaType.APPLICATION_JSON)
  fun getJobSeeker(@PathParam("jobSeekerId") id: Long): Response {
    val jobSeeker: JobSeeker = jobSeekerService.getJobSeekerById(id)
    return Response.ok(jobSeeker).build()
  }

  @PUT
  @Path("/{jobSeekerId}")
  @RolesAllowed("Administrateur", "Conseiller Insertion", "Agent Accueil", "Responsable Relation Pro")
  @Produces(MediaType.APPLICATION_JSON)
  fun updateJobSeeker(@PathParam("jobSeekerId") jobSeekerId: Long): Response {
    return Response.ok().build()
  }

  @GET
  @Path("/import")
  @Produces(MediaType.APPLICATION_JSON)
  fun importJobSeekersFromCsv(): Response{
    return try {
      jobSeekerService.importJobSeekerByCsvFile()
      Response.ok().build()
    } catch(e: Exception) {
      Response.serverError().entity(e.message).build()
    }
  }
}
