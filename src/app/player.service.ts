import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from './player';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  
  constructor(
      private http: HttpClient,
      private messageService: MessageService,
    ) { }

  private log(message: string) {
    this.messageService.add(`PlayerService: ${message}`);
  }

  private playersUrl = 'api/players'; 

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(
        tap(_ => this.log('fetched players')),
        catchError(this.handleError<Player[]>('getPlayers', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET player by id. Will 404 if id not found */
  getPlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;

    return this.http.get<Player>(url)
      .pipe(
        tap(_ => this.log(`fetched player id=${id}`)),
        catchError(this.handleError<Player>(`getPlayer id=${id}`))
      );
  }

  /** PUT: update the player on the server */
  updatePlayer(player: Player): Observable<any> {
    return this.http.put(this.playersUrl, player, httpOptions)
      .pipe(
        tap(_ => this.log(`updated player id=${player.id}`)),
        catchError(this.handleError<any>('updatePlayer'))
      );
  }

  /** POST: add a new player to the server */
  addPlayer (player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersUrl, player, httpOptions)
      .pipe(
        tap((newPlayer: Player) => this.log(`added player w/ id=${newPlayer.id}`)),
        catchError(this.handleError<Player>('addPlayer'))
      );
  }
  
  /** DELETE: delete the player from the server */
  deletePlayer (player: Player | number): Observable<Player> {
    const id = typeof player === 'number' ? player : player.id;
    const url = `${this.playersUrl}/${id}`;
  
    return this.http.delete<Player>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted player id=${id}`)),
        catchError(this.handleError<Player>('deletePlayer'))
      );
  }

}
