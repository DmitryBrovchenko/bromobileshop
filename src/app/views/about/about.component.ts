import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  e: number = Math.E;
  str = 'hello world!';
  date: Date = new Date();
  constructor(private route: ActivatedRoute) {
    console.log(route);
  }

  ngOnInit(): void {
  }

}
