import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { MessageService } from '../message.service';
import { Utilisateur } from '../../models/utilisateur';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {


  baseUrl = 'http://localhost:8080/backend/api/utilisateurs';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
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

  getUtilisateurs(): Observable<Utilisateur[]> {
    // this.log('HeroService: fetched heroes');
    return this.http.get<Utilisateur[]>(this.baseUrl)
      .pipe(
        tap(incidents => this.log(`fetched Utilisateurs`, 'Fetch Table')),
        catchError(this.handleError('getincidents', []))
      );
  }

  getUtilisateur(id: string): Observable<Utilisateur> {
    // this.log(`HeroService: fetched hero id=${id}`);
    return this.http.get<Utilisateur>(this.baseUrl + '/common/' + id)
      .pipe(
        tap(_ => this.log(`fetched Utilisateur id=${id}`, 'Fetch Element')),
        catchError(this.handleError<Utilisateur>(`getUtilisateur id=${id}`))
      );
  }

  getUtilisateurComplet(id: string): Observable<Utilisateur> {
    // this.log(`HeroService: fetched hero id=${id}`);
    return this.http.get<Utilisateur>(this.baseUrl + '/' + id)
      .pipe(
        tap(_ => this.log(`fetched Utilisateur id=${id}`, 'Fetch Element')),
        catchError(this.handleError<Utilisateur>(`getUtilisateur id=${id}`))
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/id/' + id)
      .pipe(
        tap(_ => this.log(`delete Utilisateur id=${id}`, 'Delete')),
        catchError(this.handleError<Utilisateur>(`deleteUtilisateur id=${id}`))
      );
  }

  joinPartieJoueur(userId: string, partieId: number): Observable<any> {
    return this.http.put(this.baseUrl + '/' + userId + '/parties/join/' + partieId, null)
      .pipe(
        tap(_ => this.log(`join partie Utilisateur id=${userId} partie id=${partieId}`, 'Put')),
        catchError(this.handleError<Utilisateur>(`joinpartie Utilisateur id=${userId} partie id=${partieId}`))
      );
  }

  add(utilisateur: Utilisateur): Observable<any> {
    console.log('inadd ' + utilisateur.urlAvatar);
    return this.http.post(this.baseUrl, utilisateur)
      .pipe(
        tap(_ => this.log(`add Utilisateur`, 'Add')),
        catchError(this.handleError<Utilisateur>(`addUtilisateur`))
      );
  }

  updateInfo(utilisateur: Utilisateur): Observable<any> {
    console.log('updateInfo ' + utilisateur.id);
    return this.http.put(this.baseUrl, utilisateur)
      .pipe(
        tap(_ => this.log(`updated utilisateur id=${utilisateur.id}`, 'Update')),
        catchError(this.handleError<Utilisateur>('updateUtilisateur id=${utilisateur.id}'))
      );
  }
}
