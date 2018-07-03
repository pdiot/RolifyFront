import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { MessageService } from '../message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Chatpartie } from '../../models/chatpartie';

@Injectable({
  providedIn: 'root'
})
export class ChatPartieService {

  baseUrl = 'http://localhost:8080/backend/api/messagespartie';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string, title: string) {
  //  this.messageService.showSuccess(message, title);
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

      // TODO: better job of transforming error for chat consumption
   //   this.log(`${operation} failed: ${error.message}`, 'Error');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // getChats() {
  //     return this.http.get<Chat[]>(this.baseUrl);
  // }
  getChats(id: number): Observable<Chatpartie[]> {
    // this.log('HeroService: fetched heroes');
    return this.http.get<Chatpartie[]>(this.baseUrl + '/' + id)
      .pipe(
        tap(chats => { }),
        catchError(this.handleError('getChats', []))
      );
  }

  // getChat(id: string): Observable<Chatpartie> {
  //   // this.log(`HeroService: fetched hero id=${id}`);
  //   return this.http.get<Chatpartie>(this.baseUrl + '/' + id)
  //     .pipe(
  //       tap(_ => { })),
  //     catchError(this.handleError<Chatpartie>(`getChat id=${id}`))
  //     );
  // }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/id/' + id)
      .pipe(
        tap(_ => this.log(`delete Chat id=${id}`, 'Delete')),
        catchError(this.handleError<Chatpartie>(`deleteChat id=${id}`))
      );
  }

  add(chatpartie: Chatpartie): Observable<any> {
    return this.http.post(this.baseUrl, chatpartie)
      .pipe(
        tap(_ => this.log(`add Chatpartie`, 'Add')),
        catchError(this.handleError<Chatpartie>(`addChat`))
      );
  }

  updateInfo(chat: Chatpartie): Observable<any> {
    return this.http.put(this.baseUrl, chat)
      .pipe(
        tap(_ => this.log(`updated chat of pseudo=${chat.source.pseudo}`, 'Update')),
        catchError(this.handleError<Chatpartie>('updateChat id=${chat.id}'))
      );
  }
}
