import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Personnage} from '../../../models/personnage';
import {Utilisateur} from '../../../models/utilisateur';

@Component({
  selector: 'app-personnage-preview',
  templateUrl: './personnage-preview.component.html',
  styleUrls: ['./personnage-preview.component.css']
})
export class PersonnagePreviewComponent implements OnInit {

  @Input() tuplePersonnageJoueur: [Personnage, Utilisateur];
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
