import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Personnage} from '../../../models/personnage';

@Component({
  selector: 'app-personnage-details',
  templateUrl: './personnage-details.component.html',
  styleUrls: ['./personnage-details.component.css']
})
export class PersonnageDetailsComponent implements OnInit {

  @Input() personnage: Personnage;
  @Output() sortie = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  click() {
    this.sortie.emit('OK');
  }

}
