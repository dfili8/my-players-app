import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Player } from './player';
import { PLAYERS } from './mock-players';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  getPlayers(): Observable<Player[]> {
    return of(PLAYERS);
  }

  constructor() { }
}
