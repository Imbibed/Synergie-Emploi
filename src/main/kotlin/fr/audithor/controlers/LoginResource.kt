package fr.audithor.controlers

import fr.audithor.dto.Credentials
import fr.audithor.dto.UserRole
import fr.audithor.services.LoginService
import jakarta.annotation.security.PermitAll

import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response

@Path("/api/login")
class LoginResource(val loginService: LoginService) {

    @POST
    @PermitAll
    @Produces(MediaType.TEXT_PLAIN)
    fun login(credentials: Credentials): Response {
      try{
        if(loginService.verifyCredentials(credentials.username, credentials.password)){
          val userRole = loginService.getUserRoleByUsername(credentials.username)
          val token: String = loginService.getToken(userRole)
          return Response.ok(token).build()
        }
        return Response.ok("Mot de passe incorrect").build()
      } catch (ex: Exception) {
        return Response.serverError().build()
      }
    }
}
