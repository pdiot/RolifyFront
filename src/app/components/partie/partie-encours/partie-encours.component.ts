import {Component, Input, OnInit} from '@angular/core';
import {Partie} from '../../../models/partie';
import {Utilisateur} from '../../../models/utilisateur';
import {AuthService} from '../../../services/auth.service';
import {User} from 'firebase';
import {ActivatedRoute} from '@angular/router';
import {PartieImageComponent} from '../partie-image/partie-image.component';

@Component({
  selector: 'app-partie-encours',
  templateUrl: './partie-encours.component.html',
  styleUrls: ['./partie-encours.component.css']
})
export class PartieEncoursComponent implements OnInit {

  partieId: number;
  partie: Partie;
  currentUser: User;

  constructor(private auth: AuthService, private activatedRoute: ActivatedRoute) {
    this.currentUser = auth.currentUser;
    this.activatedRoute.queryParams.subscribe(params => {
      this.partieId = params['partie'];
      console.log(this.partieId); // Print the parameter to the console.
    });
  }

  ngOnInit() {
    this.partie = new Partie();
    this.partie.titre = 'Test titre';
    this.partie.description = 'Test description';
    this.partie.mj = new Utilisateur('urltest', 'Test MJ' , '');

  }

}
