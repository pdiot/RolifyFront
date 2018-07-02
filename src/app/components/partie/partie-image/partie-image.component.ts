import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-partie-image',
  templateUrl: './partie-image.component.html',
  styleUrls: ['./partie-image.component.css']
})
export class PartieImageComponent implements OnInit {

  @Input() img: string;

  constructor() { }

  ngOnInit() {
    console.log('in imgcomp ' + this.img);
  }

}
