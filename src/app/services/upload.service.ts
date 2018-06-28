import { Injectable } from '@angular/core';
import { Upload } from '../models/upload';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  currentUser: any;
  messageService: any;


  constructor() { }

  private basePath = '/uploads';
  // uploads: FirebaseListObservable<Upload[]>;

  pushUpload(upload: Upload, id: string) {
    return new Promise<Upload>(
      (resolve, reject) => {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`avatars/${id}`).put(upload.file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            // upload in progress
            const snap = snapshot as firebase.storage.UploadTaskSnapshot;
            upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100; // CHANGEMENT IS HERE
          },
          (error) => {
            // upload failed
            console.log(error);
            reject(error);
          },
          () => {
            // upload success
             uploadTask.snapshot.ref.getDownloadURL().then(
               (url) => {
                console.log('upload.url' + upload.url);
                resolve(upload);
                upload.url = url;
               });
            // upload.name = upload.file.name
          }
        );
      });
  }


}
