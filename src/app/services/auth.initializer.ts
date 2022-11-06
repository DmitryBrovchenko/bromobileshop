import { from, Observable, of, switchMap } from 'rxjs';
import { UserService } from './user.service';
export function authInitializer(userService: UserService): () => Observable<any> {
    return () => userService.getAuthState()
        .pipe(
            switchMap(user => {
                if (!user) {
                    return (from(userService.loginGuest()));
                } else {
                    return of(user);
                }
            })
        )
}