import { Injectable } from '@angular/core';
import {Utilisateur} from '../../models/utilisateur';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../message.service';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Partie} from '../../models/partie';

@Injectable({
  providedIn: 'root'
})
export class PartieService {

  baseUrl = 'http://localhost:8080/backend/api/parties';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** Log a PartieService message with the MessageService */
  private log(message: string, title: string) {
    this.messageService.showSuccess(message, title);
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
      this.log(`${operation} failed: ${error.message}`, 'Error');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getParties(): Observable<Partie[]> {
    // this.log('HeroService: fetched heroes');
    return this.http.get<Partie[]>(this.baseUrl)
      .pipe(
        tap(partie => {}),
        catchError(this.handleError('getParties', []))
      );
  }

  getPartie(id: number): Observable<Partie> {
    // this.log(`HeroService: fetched hero id=${id}`);
    return this.http.get<Partie>(this.baseUrl + '/' + id)
      .pipe(
        tap(_ => this.log(`fetched Partie id=${id}`, 'Fetch Element')),
        catchError(this.handleError<Partie>(`getPartie id=${id}`))
      );
  }

  getPartiesByMj(idMj: string): Observable<Partie[]> {
    // this.log(`HeroService: fetched hero id=${id}`);
    return this.http.get<Partie[]>(this.baseUrl + '/mj/' + idMj)
      .pipe(
        tap(_ => this.log(`fetched Partie by Mj id=${idMj}`, 'Fetch Element')),
        catchError(this.handleError<Partie[]>(`getPartiebyMj id=${idMj}`))
      );
  }

  getPartiesByJoueur(idMj: string): Observable<Partie[]> {
    // this.log(`HeroService: fetched hero id=${id}`);
    return this.http.get<Partie[]>(this.baseUrl + '/joueur/' + idMj)
      .pipe(
        tap(_ => this.log(`fetched Partie by Joueur id=${idMj}`, 'Fetch Element')),
        catchError(this.handleError<Partie[]>(`getPartiebyMj id=${idMj}`))
      );
  }

  getPartiesNotIn(idUtil: string): Observable<Partie[]> {
    // this.log(`HeroService: fetched hero id=${id}`);
    return this.http.get<Partie[]>(this.baseUrl + '/notin/' + idUtil)
      .pipe(
        tap(_ => this.log(`fetched Partie by Util not in id=${idUtil}`, 'Fetch Element')),
        catchError(this.handleError<Partie[]>(`get Partie by Util not in id=${idUtil}`))
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id)
      .pipe(
        tap(_ => this.log(`delete Partie id=${id}`, 'Delete')),
        catchError(this.handleError<Partie>(`deletePartie id=${id}`))
      );
  }

  add(partie: Partie): Observable<any> {
    return this.http.post(this.baseUrl, partie)
      .pipe(
        tap(_ => this.log(`add Partie`, 'Add')),
        catchError(this.handleError<Partie>(`addPartie`))
      );
  }

  update(partie: Partie): Observable<any> {
    console.log('update partie ' + partie.id);
    return this.http.put(this.baseUrl, partie)
      .pipe(
        tap(_ => this.log(`updated partie id=${partie.id}`, 'Update')),
        catchError(this.handleError<Partie>('updatePartie id=${partie.id}'))
      );
  }

}
