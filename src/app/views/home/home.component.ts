import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseAdminService} from '../../services/firebase-admin.service';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  data;
  loading = true;
  constructor(private router: Router, public adminService: FirebaseAdminService, public dataService: DataService) {
    dataService.getHierarchy().subscribe(res => {
      this.data = res;
      console.log(res);
      this.loading = false;
    });
  }

  goToCatalogue() {
    this.router.navigate(['/catalogue']);
  }

}
