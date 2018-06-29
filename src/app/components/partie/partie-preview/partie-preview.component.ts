import {Component, Input, OnInit} from '@angular/core';
import {Partie} from '../../../models/partie';

@Component({
  selector: '[app-partie-preview]',
  templateUrl: './partie-preview.component.html',
  styleUrls: ['./partie-preview.component.css']
})
export class PartiePreviewComponent implements OnInit {

  @Input() partie: Partie;

  constructor() { }

  ngOnInit() {
  }

}
