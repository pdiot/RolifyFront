import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  resul = -1;
  @Output() refresh = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  lancer() {
    this.resul = Math.round((21 * Math.random()) - 0.5);
    this.refresh.emit(this.resul);
  }

  reset() {
    this.resul = -1;
  }

}
