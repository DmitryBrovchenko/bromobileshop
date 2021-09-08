import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/compat/database';

interface Product {
  content: string;
  id: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  values: Product[];
  content: string;
  id: number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private db: AngularFireDatabase) {
    this.db.list('NewList').valueChanges().subscribe((obj: Product[]) => {
      this.values = obj;
      this.content = this.getByID(this.id).content;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      if (this.values) {
        this.content = this.getByID(this.id).content;
      }
    });
  }

  getByID(id: number) {
    return this.values.find(p => p.id === id);
  }

  loadPost() {
    this.router.navigate(['/product', 3]);
  }

}
