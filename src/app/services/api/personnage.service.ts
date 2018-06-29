import { Injectable } from '@angular/core';
import {Utilisateur} from '../../models/utilisateur';
import {HttpClient} from '@angular/common/http';
import {Partie} from '../../models/partie';
import {MessageService} from '../message.service';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Personnage} from '../../models/personnage';

@Injectable({
  providedIn: 'root'
})
export class PersonnageService {

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

  getPersonnages(): Observable<Personnage[]> {
    // this.log('HeroService: fetched heroes');
    return this.http.get<Personnage[]>(this.baseUrl)
      .pipe(
        tap(incidents => this.log(`fetched Personnage`, 'Fetch Table')),
        catchError(this.handleError('getincidents', []))
      );
  }

  getPersonnage(id: number): Observable<Personnage> {
    // this.log(`HeroService: fetched hero id=${id}`);
    return this.http.get<Personnage>(this.baseUrl + '/' + id)
      .pipe(
        tap(_ => this.log(`fetched Personnage id=${id}`, 'Fetch Element')),
        catchError(this.handleError<Personnage>(`getPersonnage id=${id}`))
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id)
      .pipe(
        tap(_ => this.log(`delete Personnage id=${id}`, 'Delete')),
        catchError(this.handleError<Personnage>(`del Personnage id=${id}`))
      );
  }

  add(perso: Personnage): Observable<any> {
    return this.http.post(this.baseUrl, perso)
      .pipe(
        tap(_ => this.log(`add Personnage`, 'Add')),
        catchError(this.handleError<Personnage>(`addPersonnage`))
      );
  }

  update(perso: Personnage): Observable<any> {
    console.log('update perso ' + perso.id);
    return this.http.put(this.baseUrl, perso)
      .pipe(
        tap(_ => this.log(`updated partie id=${perso.id}`, 'Update')),
        catchError(this.handleError<Personnage>('updatePartie id=${partie.id}'))
      );
  }
}
