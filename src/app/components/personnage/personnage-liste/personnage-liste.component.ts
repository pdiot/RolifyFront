import {Component, Input, OnInit} from '@angular/core';
import {Partie} from '../../../models/partie';
import {Personnage} from '../../../models/personnage';

@Component({
  selector: 'app-personnage-liste',
  templateUrl: './personnage-liste.component.html',
  styleUrls: ['./personnage-liste.component.css']
})
export class PersonnageListeComponent implements OnInit {

  @Input() partie: Partie;
  personnages: Array<Personnage>;
  constructor() { }

  ngOnInit() {
    this.personnages = new Array<Personnage>();
    this.personnages.push(new Personnage());
    this.personnages.push(new Personnage());
    this.personnages.push(new Personnage());
    this.personnages.push(new Personnage());
  }

}
