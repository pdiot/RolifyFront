import {Component, Input, OnInit} from '@angular/core';
import {Partie} from '../../../models/partie';

@Component({
  selector: 'app-liste-joueurs',
  templateUrl: './liste-joueurs.component.html',
  styleUrls: ['./liste-joueurs.component.css']
})
export class ListeJoueursComponent implements OnInit {

  @Input() partie: Partie;
  constructor() { }

  ngOnInit() {
  }

}
