import { from, Observable, of, switchMap, take } from 'rxjs';
import { UserService } from './user.service';
export function authInitializer(userService: UserService): () => Observable<any> {
    return () => userService.getAuthState()
        .pipe(
            switchMap(user => {
                if (!user) {
                    console.log('Sign in as guest');
                    return (from(userService.loginGuest()));
                } else {
                    console.log('Already signed in');
                    return of(user);
                }
            }),
            take(1)
        )
}