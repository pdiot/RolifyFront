import { Component, OnInit, Input } from '@angular/core';
import { Partie } from '../../../models/partie';
import { Upload } from '../../../models/upload';
import { UploadService } from '../../../services/upload.service';
import { PartieService } from '../../../services/api/partie.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-partie-image',
  templateUrl: './partie-image.component.html',
  styleUrls: ['./partie-image.component.css']
})
export class PartieImageComponent implements OnInit {

  @Input() img: string;
  @Input() partie: Partie;

  currentUpload: Upload = null;

  constructor(private uploadService: UploadService,
    private messageService: MessageService,
    private partieService: PartieService) { }

  ngOnInit() {
    console.log('in imgcomp ' + this.img);
  }

  onFileChanged(event) {  // recup de l'img et transformtion en Upload
    const file = event.target.files[0];
    this.currentUpload = new Upload(file);
    //  this.url = file.name;
  }

  upImg() {
    this.uploadService.pushUpload(this.currentUpload, '' + this.partie.id, 1).then( // upload img dans firebase et recup de l' url
      (upload) => {
        this.partie.image = upload.url;
        this.partieService.update(this.partie).subscribe(
          partieUpdate => {
            this.messageService.showSuccess('Nouvelle partie crée', 'New Game');
          },
          err => {
            this.messageService.showSuccess('Erreur', 'New Game');
          });
      });
  }

}
