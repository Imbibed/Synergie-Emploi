import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {catchError, map, of} from "rxjs";

export const authGuardFn: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthenticationService = inject(AuthenticationService);
  const router: Router = inject(Router);
  return authService.isLogged().pipe(
    map((user: {username: string, roles: string[]}) => {
      authService.setUser(user);
      const expectedRoles: string[] | undefined = route.data?.['roles'] as string[] | undefined
      if(!expectedRoles || expectedRoles.length === 0) {
        return true;
      }
      const hasRole: boolean = user.roles.some(role => expectedRoles.includes((role)));
      return hasRole ? true : router.createUrlTree(['/forbiden']);
    }),
    catchError(() => of(router.createUrlTree(['/login'])))
  )
}
