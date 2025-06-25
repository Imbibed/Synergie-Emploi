package fr.audithor.controlers

import fr.audithor.dto.exceptions.FileEmptyException
import fr.audithor.services.JobSeekerService
import jakarta.annotation.security.RolesAllowed
import jakarta.ws.rs.GET
import jakarta.ws.rs.PUT
import jakarta.ws.rs.Path
import jakarta.ws.rs.PathParam
import jakarta.ws.rs.Produces
import jakarta.ws.rs.QueryParam
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import model.JobSeeker

@Path("/api/jobseeker")
class JobSeekerResource(private val jobSeekerService: JobSeekerService) {

  @GET
  @RolesAllowed("ADMINISTRATEUR", "CONSEILLER_INSERTION", "AGENT_ACCUEIL", "RESPONSABLE_RELATION_PRO")
  @Produces(MediaType.APPLICATION_JSON)
  fun getAllLazy(@QueryParam("page") page: Int, @QueryParam("size") size: Int): Response {
    val jobSeekersDto = jobSeekerService.getAllLazy(page, size)
    return Response.ok(jobSeekersDto).build()
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
