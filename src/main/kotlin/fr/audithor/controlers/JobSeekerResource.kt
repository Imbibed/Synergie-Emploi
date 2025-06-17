package fr.audithor.controlers

import fr.audithor.services.JobSeekerService
import jakarta.annotation.security.RolesAllowed
import jakarta.ws.rs.GET
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
  @RolesAllowed("Administrateur", "Conseiller Insertion", "Agent Accueil", "Responsable Relation Pro")
  @Produces(MediaType.APPLICATION_JSON)
  fun getAllLazy(@QueryParam("page") page: Int, @QueryParam("size") size: Int): Response {
    val jobSeekersDto = jobSeekerService.getAllLazy(page, size)
    return Response.ok(jobSeekersDto).build()
  }

  @GET
  @Path("/{jobSeekerId}")
  @RolesAllowed("Administrateur", "Conseiller Insertion", "Agent Accueil", "Responsable Relation Pro")
  @Produces(MediaType.APPLICATION_JSON)
  fun getJobSeeker(@PathParam("jobSeekerId") id: Int): Response {
    val jobSeeker: JobSeeker = jobSeekerService.getJobSeekerById(id)
    return Response.ok(jobSeeker).build()
  }
}
