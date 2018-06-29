import {Component, Input, OnInit} from '@angular/core';
import {Personnage} from '../../../models/personnage';

@Component({
  selector: 'app-personnage-preview',
  templateUrl: './personnage-preview.component.html',
  styleUrls: ['./personnage-preview.component.css']
})
export class PersonnagePreviewComponent implements OnInit {

  @Input() personnage: Personnage;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
