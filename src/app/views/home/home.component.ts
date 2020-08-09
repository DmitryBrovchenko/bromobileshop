import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseAdminService} from '../../services/firebase-admin.service';
import {DataService} from '../../services/data.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  data;
  loading = true;
  constructor(
    private router: Router,
    public adminService: FirebaseAdminService,
    public dataService: DataService,
    public auth: AngularFireAuth) {
    dataService.getHierarchy().subscribe(res => {
      this.data = res;
      console.log(res);
      this.loading = false;
    });
  }

  goToCatalogue() {
    this.router.navigate(['/catalogue']);
  }
  printUser(event) {
    console.log(event);
  }

  printError(event) {
    console.error(event);
  }

}
