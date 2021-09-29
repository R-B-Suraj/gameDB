import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces';

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent implements OnInit {

  // the data of game is inside the game variable for which we called the details
  // input .. we will be receiving info  
  // the data of game is inside the game variable for which we called the details
  // input .. we will be receiving info  

  @Input()
  game!: Game;

  constructor() { }

  ngOnInit(): void {
  }

}
