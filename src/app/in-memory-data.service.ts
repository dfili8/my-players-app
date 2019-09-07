import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Player } from './player';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const players = [
      { id: 1, name: 'Kobe Byrant', position: 'SG', number: 24, team: 'Lakers', image: "assets/bryant.jpeg" },
      { id: 7, name: 'Allen Iverson', position: 'PG', number: 3, team: 'Sixers', image: "assets/iverson.jpeg" },
      { id: 3, name: 'Steve Nash', position: 'PG', number: 13, team: 'Suns', image: "assets/nash.jpeg" },
      { id: 4, name: 'Shaq O\'Neal', position: 'C', number: 32, team: 'Heat', image: "assets/oneal.jpeg" },
      { id: 6, name: 'LeBron James', position: 'SF', number: 23, team: 'Lakers', image: "assets/james.jpeg" },
    ];
    return {players};
  }

  // Overrides the genId method to ensure that a player always has an id.
  // If the players array is empty,
  // the method below returns the initial number (11).
  // if the players array is not empty, the method below returns the highest
  // player id + 1.
  genId(players: Player[]): number {
    return players.length > 0 ? Math.max(...players.map(player => player.id)) + 1 : 11;
  }
}