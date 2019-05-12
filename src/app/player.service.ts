import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from './player';
import { PLAYERS } from './mock-players';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  
  constructor(private messageService: MessageService) { }

  getPlayers(): Observable<Player[]> {
    this.messageService.add('PlayerService: fetched players');
    return of(PLAYERS);
  }

  getPlayer(id: number): Observable<Player> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`PlayerService: fetched player id=${id}`);
    return of(PLAYERS.find(player => player.id === id));
  }

}
