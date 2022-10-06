import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { loadCatalogue } from './@ngrx/catalogue/catalogue.actions';
import { loadDictionary } from './@ngrx/dictionary/dictionary.actions';
import { loadHierarchy } from './@ngrx/hierarchy/hierarchy.actions';
import { selectHierarchy } from './@ngrx/hierarchy/hierarchy.reducer';
import { loadImages } from './@ngrx/images/images.actions';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hierarchy$;
  title = 'Bromobile shop';

  constructor(public userService: UserService, private store: Store) {
    this.userService.getAuthState().pipe(take(1))
    .subscribe((user) => {
      console.log('User', user);
      if(!user) {
        this.userService.loginGuest().then(() => {
          console.log('Logged in as guest');
          this.triggerDataLoad();
        })
      } else {
        this.triggerDataLoad();
      }
    });  

    this.hierarchy$ = this.store.select(selectHierarchy);
  }

  triggerDataLoad() {
    this.store.dispatch(loadHierarchy());
    this.store.dispatch(loadDictionary());
    this.store.dispatch(loadCatalogue());
    this.store.dispatch(loadImages());
    console.log('Dispatched');
  }
}
