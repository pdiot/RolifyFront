import {Component, Input, OnInit} from '@angular/core';
import {Partie} from '../../../models/partie';
import {AuthService} from '../../../services/auth.service';
import {PartieService} from '../../../services/api/partie.service';
import {Utilisateur} from '../../../models/utilisateur';

@Component({
  selector: 'app-partie-liste',
  templateUrl: './partie-liste.component.html',
  styleUrls: ['./partie-liste.component.css']
})
export class PartieListeComponent implements OnInit {


  utilisateur: firebase.User;
  partiesJoueur: Array<Partie>;
  partiesMJ: Array<Partie>;
  partiesNotIn: Array<Partie>;

  constructor(private authService: AuthService,
              private partieService: PartieService) { }

  ngOnInit() {
    this.authService.getCurrentUser().then(    // useless
      (user) => {
        this.utilisateur = user;
        console.log('User dans partie-liste : user');
        this.partieService.getPartiesByJoueur(this.utilisateur.uid).subscribe(
          parties => this.partiesJoueur = parties
        );
        this.partieService.getPartiesByMj(this.utilisateur.uid).subscribe(
          parties => this.partiesMJ = parties
        );
        this.partieService.getPartiesNotIn(this.utilisateur.uid).subscribe(
          parties => this.partiesNotIn = parties
        );
      },
      (error) => {
        this.utilisateur = null;
      });


  }

}
