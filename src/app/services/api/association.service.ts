import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {HttpClient} from '@angular/common/http';
import {Association} from '../../models/association';

@Injectable({
  providedIn: 'root'
})
export class AssociationService {
  baseUrl = 'http://localhost:8080/backend/api/assos';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  /** Log a PartieService message with the MessageService */
  private log(message: string, title: string) {
 //   this.messageService.showSuccess(message, title);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for utilisateur consumption
   //   this.log(`${operation} failed: ${error.message}`, 'Error');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAssociations(): Observable<Association[]> {
    // this.log('HeroService: fetched heroes');
    return this.http.get<Association[]>(this.baseUrl)
      .pipe(
        tap(incidents => this.log(`fetched Association`, 'Fetch Table')),
        catchError(this.handleError('getincidents', []))
      );
  }

  getAssociation(id: number): Observable<Association> {
    // this.log(`HeroService: fetched hero id=${id}`);
    return this.http.get<Association>(this.baseUrl + '/' + id)
      .pipe(
        tap(_ => this.log(`fetched Association id=${id}`, 'Fetch Element')),
        catchError(this.handleError<Association>(`getAssociation id=${id}`))
      );
  }

  getAssociationsJoueur(partieId: number): Observable<Association[]> {
    // this.log('HeroService: fetched heroes');
    return this.http.get<Association[]>(this.baseUrl + '/partie/' + partieId )
      .pipe(
        tap(incidents => this.log(`fetched Association`, 'Fetch Table')),
        catchError(this.handleError('getincidents', []))
      );
  }

  getAssociationsJoueurPartie(utilId: string, partieId: number): Observable<Association[]> {
    return this.http.get<Association[]>(this.baseUrl + '/partie/' + partieId + '/joueur/' + utilId )
      .pipe(
        tap(associations => this.log(`fetched Association`, 'Fetch Table')),
        catchError(this.handleError('getassociations', []))
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id)
      .pipe(
        tap(_ => this.log(`delete Association id=${id}`, 'Delete')),
        catchError(this.handleError<Association>(`del Association id=${id}`))
      );
  }

  add(perso: Association): Observable<any> {
    return this.http.post(this.baseUrl, perso)
      .pipe(
        tap(_ => this.log(`add Association`, 'Add')),
        catchError(this.handleError<Association>(`addAssociation`))
      );
  }

  update(perso: Association): Observable<any> {
    console.log('update perso ' + perso.id);
    return this.http.put(this.baseUrl, perso)
      .pipe(
        tap(_ => this.log(`updated partie id=${perso.id}`, 'Update')),
        catchError(this.handleError<Association>('updateAssociation id=${partie.id}'))
      );
  }
}
