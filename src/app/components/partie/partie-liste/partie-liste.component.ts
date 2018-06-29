import { Component, OnInit } from '@angular/core';
import {Partie} from '../../../models/partie';

@Component({
  selector: 'app-partie-liste',
  templateUrl: './partie-liste.component.html',
  styleUrls: ['./partie-liste.component.css']
})
export class PartieListeComponent implements OnInit {

  partiesJoueur: Array<Partie>;
  partiesMJ: Array<Partie>;
  partiesNotIn: Array<Partie>;

  constructor() { }

  ngOnInit() {
  }

}
