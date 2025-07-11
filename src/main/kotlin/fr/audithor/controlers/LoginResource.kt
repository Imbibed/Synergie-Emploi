package fr.audithor.controlers

import fr.audithor.dto.Credentials
import fr.audithor.dto.exceptions.UserNotFoundException
import fr.audithor.services.LoginService
import jakarta.annotation.security.PermitAll
import jakarta.annotation.security.RolesAllowed
import jakarta.inject.Inject
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.GET

import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.*
import org.eclipse.microprofile.jwt.JsonWebToken

@Path("/api/login")
class LoginResource(val loginService: LoginService) {

  @Inject
  lateinit var jwt: JsonWebToken

  @POST
  @PermitAll
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  fun login(credentials: Credentials): Response {
    try{
      if(loginService.verifyCredentials(credentials.username, credentials.password)){
        val userRole = loginService.getUserRoleByUsername(credentials.username)
        val token: String = loginService.generateToken(userRole)
        val cookie = "jwt=${token}; Path=/; HttpOnly; SameSite=Strict; Secure"
        return Response.ok().header("Set-Cookie", cookie).build()
      }
      return Response.status(401).entity("Mot de passe incorrect").build()
    } catch (ex: UserNotFoundException) {
      return Response.status(401).entity(ex.msg).build()
    } catch (ex: Exception) {
      return Response.serverError().build()
    }
  }

  @GET
  @RolesAllowed("ADMINISTRATEUR", "CONSEILLER_INSERTION", "AGENT_ACCUEIL", "RESPONSABLE_RELATION_PRO")
  @Produces(MediaType.APPLICATION_JSON)
  fun isLogged(@Context securityContext: SecurityContext): Response {
    val principal = securityContext.userPrincipal
    val roles = jwt.groups
    return Response.ok(mapOf("username" to principal.name, "roles" to roles)).build()
  }
}
