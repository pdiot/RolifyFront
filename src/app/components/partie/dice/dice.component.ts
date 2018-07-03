import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  public resul = -1;
  // @Output() refresh = new EventEmitter<number>();

  constructor(
  ) { }

  ngOnInit() {
  }

  lancer() {
    this.resul = Math.round((20 * Math.random()) + 1);
    sessionStorage.setItem('value', '' + this.resul);
    console.log('in dice : ' + this.resul);
    setTimeout(
      () => {
        sessionStorage.setItem('value', '' + -1);
        this.resul = -1;
      },
      2000);
  }


}
