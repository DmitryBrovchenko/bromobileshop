import { Component, OnInit } from '@angular/core';
import {FirebaseAdminService} from '../../services/firebase-admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public adminService: FirebaseAdminService) { }

  ngOnInit(): void {
  }

}
