import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarouselItem } from 'src/app/interfaces/carousel-item';

@Component({
  selector: 'app-carousel-edit',
  templateUrl: './carousel-edit.component.html',
  styleUrls: ['./carousel-edit.component.scss']
})
export class CarouselEditComponent implements OnInit {
  @Input()
  set carouselItem(item: CarouselItem) {
    if (item) {
      this.form.patchValue(item);
    } else {
      this.form.reset();
    }
  }

  form = new FormGroup({
    id: new FormControl(),
    description: new FormControl(),
    
  })
  
  constructor() { }

  ngOnInit(): void {
  }

}
