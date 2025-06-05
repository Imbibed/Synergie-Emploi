package fr.audithor.controlers

import jakarta.ws.rs.GET
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType

@Path("/api/login")
class LoginResource {

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    fun hello() = "Hello from Quarkus REST"
}
