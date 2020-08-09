import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bromobileshop';
  constructor(public auth: AngularFireAuth) {
  }
  ngOnInit(): void {
    this.auth.auth.signInAnonymously().then(() => console.log(this.auth.auth.currentUser));
  }
}
