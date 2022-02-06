import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBrands } from 'src/app/@ngrx/brands/brands.actions';
import { selectBrands } from 'src/app/@ngrx/brands/brands.reducer';
import { loadCarousel } from 'src/app/@ngrx/carousel/carousel.actions';
import { selectCarousel } from 'src/app/@ngrx/carousel/carousel.reducer';
import { BrandItem } from 'src/app/interfaces/brand-item.interface';
import { CarouselItem } from 'src/app/interfaces/carousel-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  brands$: Observable<BrandItem[]>;
  carouselItems$: Observable<CarouselItem[]>;

  constructor(
    private store: Store,
    private router: Router
    ) { 
    store.dispatch(loadBrands());
    store.dispatch(loadCarousel());
  }

  ngOnInit(): void {
    this.brands$ = this.store.select(selectBrands);
    this.carouselItems$ = this.store.select(selectCarousel);
  }

  goToSearch(criteria: string) {
    this.router.navigate(['search'], { queryParams: { criteria } });
  }

}
