import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'p8-card',
  templateUrl: './p8-card.component.html',
  styleUrls: ['./p8-card.component.css']
})
export class P8CardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() cardTitle:string
}
