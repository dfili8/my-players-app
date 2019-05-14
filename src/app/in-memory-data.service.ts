import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Player } from './player';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const players = [
      { id: 24, name: 'Kobe Byrant', position: 'Shooting Guard' },
      { id: 23, name: 'Michael Jordan', position: 'Shooting Guard' },
      { id: 30, name: 'Steph Curry', position: 'Point Guard' },
      { id: 32, name: 'Shaq ONeil', position: 'Center' },
      { id: 3, name: 'Ben Wallace', position: 'Center' },
      { id: 1, name: 'Tracy McGrady', position: 'Shooting Guard' },
      { id: 21, name: 'Tim Duncan', position: 'Power Forward' },
      { id: 3, name: 'Allen Iverson', position: 'Point Guard' },
      { id: 71, name: 'Luka Doncic', position: 'Shooting Guard' },
      { id: 41, name: 'Dirk Nowitski', position: 'Small Forward' }
    ];
    return {players};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(players: Player[]): number {
    return players.length > 0 ? Math.max(...players.map(player => player.id)) + 1 : 11;
  }
}