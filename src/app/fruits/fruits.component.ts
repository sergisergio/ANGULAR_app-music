import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.scss']
})
export class FruitsComponent implements OnInit {

  @Input() mangue: string;

  constructor() { }

  ngOnInit() {
  }

}
