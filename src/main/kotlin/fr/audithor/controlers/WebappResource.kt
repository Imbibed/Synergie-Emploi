package fr.audithor.controlers

import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response

@Path("/{path: .*}")
class WebappResource {
  @GET
  @Produces(MediaType.TEXT_HTML)
  fun index(): Response {
    val indexHtml = this::class.java.getResourceAsStream("/META-INF/resources/index.html")
    return Response.ok(indexHtml).build()
  }
}
