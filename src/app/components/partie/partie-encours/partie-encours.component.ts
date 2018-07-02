import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Partie } from '../../../models/partie';
import { Utilisateur } from '../../../models/utilisateur';
import { AuthService } from '../../../services/auth.service';
import { User } from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { PartieImageComponent } from '../partie-image/partie-image.component';
import { PartieService } from '../../../services/api/partie.service';
import { Role } from '../../../enums/role.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-partie-encours',
  templateUrl: './partie-encours.component.html',
  styleUrls: ['./partie-encours.component.css']
})
export class PartieEncoursComponent implements OnInit {


  partieId: number;
  role: number;
  partie: Partie;
  currentUser: User;
  modalRef;
  dice: number;

  constructor(private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private partieService: PartieService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router) {

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      params => {
        this.partieId = +params['idPartie'];
        console.log('idPartie : ' + this.partieId);
        this.role = params['role'];
        this.partieService.getPartie(this.partieId).subscribe(
          partie => {
            this.partie = partie;
            console.log('this.partie = ' + this.partie);
          }
        );
      });

    this.authService.getCurrentUser().then(    // plus sure
      (user) => {
        this.currentUser = user;
        //  // console.log('current user : ' + this.auth.currentUser);

        //   this.activatedRoute.params.subscribe(
        //     params => {
        //       this.partieId = +params['idPartie'];
        //       console.log('idPartie : ' + this.partieId);
        //       this.role = params['role'];
        //       this.partieService.getPartie(this.partieId).subscribe(
        //         partie => {
        //           this.partie = partie;
        //           console.log('this.partie = ' + this.partie);
        //         }
        //       );
        //     });
      },
      (error) => {
        this.currentUser = null;
      });

  }

  open(content) {
    this.modalRef = this.modalService.open(content);
  }

  onClose(event) {
    if (event === 'UPDATED') {
      this.modalRef.close();
      this.ngOnInit();
    }
    if (event === 'MJCHANGED') {
      this.modalRef.close();
      this.router.navigateByUrl('/lobby');
    }
  }

  refresh(n: number) {
    console.log('n ' + n);
    this.dice = n;
  }

}
