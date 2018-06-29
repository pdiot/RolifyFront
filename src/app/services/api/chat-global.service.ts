import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { MessageService } from '../message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Chat } from '../../models/chat';


@Injectable({
  providedIn: 'root'
})
export class ChatGlobalService {

  baseUrl = 'http://localhost:8080/backend/api/messagesglobal';

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

      // TODO: better job of transforming error for chat consumption
      this.log(`${operation} failed: ${error.message}`, 'Error');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getChats() {
      return this.http.get<Chat[]>(this.baseUrl);
  }
  // getChats(): Observable<Chat[]> {
  //   // this.log('HeroService: fetched heroes');
  //   return this.http.get<Chat[]>(this.baseUrl)
  //     .pipe(
  //       tap(incidents => this.log(`fetched Chats`, 'Fetch Table')),
  //       catchError(this.handleError('getChats', []))
  //     );
  // }

  getChat(id: string): Observable<Chat> {
    // this.log(`HeroService: fetched hero id=${id}`);
    return this.http.get<Chat>(this.baseUrl + '/' + id)
      .pipe(
        tap(_ => this.log(`fetched Chat id=${id}`, 'Fetch Element')),
        catchError(this.handleError<Chat>(`getChat id=${id}`))
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/id/' + id)
      .pipe(
        tap(_ => this.log(`delete Chat id=${id}`, 'Delete')),
        catchError(this.handleError<Chat>(`deleteChat id=${id}`))
      );
  }

  add(chat: Chat): Observable<any> {
    return this.http.post(this.baseUrl, chat)
      .pipe(
        tap(_ => this.log(`add Chat`, 'Add')),
        catchError(this.handleError<Chat>(`addChat`))
      );
  }

  updateInfo(chat: Chat): Observable<any> {
    return this.http.put(this.baseUrl, chat)
      .pipe(
        tap(_ => this.log(`updated chat of pseudo=${chat.source.pseudo}`, 'Update')),
        catchError(this.handleError<Chat>('updateChat id=${chat.id}'))
      );
  }
}
