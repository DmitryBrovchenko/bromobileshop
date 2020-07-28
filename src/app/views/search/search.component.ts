import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  newList$ = this.db.list('NewList').valueChanges();
  search = '';
  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
  }

}
