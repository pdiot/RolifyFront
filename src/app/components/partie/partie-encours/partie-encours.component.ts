import {Component, Input, OnInit} from '@angular/core';
import {Partie} from '../../../models/partie';
import {Utilisateur} from '../../../models/utilisateur';
import {AuthService} from '../../../services/auth.service';
import {User} from 'firebase';
import {ActivatedRoute} from '@angular/router';
import {PartieImageComponent} from '../partie-image/partie-image.component';
import {PartieService} from '../../../services/api/partie.service';

@Component({
  selector: 'app-partie-encours',
  templateUrl: './partie-encours.component.html',
  styleUrls: ['./partie-encours.component.css']
})
export class PartieEncoursComponent implements OnInit {

  partieId: number;
  partie: Partie;
  currentUser: User;

  constructor(private auth: AuthService, private activatedRoute: ActivatedRoute, private partieService: PartieService) {

  }

  ngOnInit() {

    this.currentUser = this.auth.currentUser;
    this.activatedRoute.params.subscribe(
      params => {
      this.partieId = +params['idPartie'];
      console.log('idPartie : ' + this.partieId); // Print the parameter to the console.
      this.partieService.getPartie(this.partieId).subscribe(
        partie => {
          this.partie = partie;
          console.log('this.partie = ' + this.partie);
        }
      );
    });
  }

}
