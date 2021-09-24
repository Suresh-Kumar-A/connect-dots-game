import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/user';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  playerList:User[]=[];
  count=0;
  constructor() { }

  ngOnInit(): void {
    this.addSamplePlayers();
  }

  private addSamplePlayers(){
    const player1:User={
      uid: 'SK1',
      name: 'Suresh Kumar',
      status: false,
      score: 40
    };
    const player2:User={
      uid: 'DR1',
      name: 'Dinesh Raj',
      status: false,
      score: 20
    };
    const player3:User={
      uid: 'AR1',
      name: 'Amit Raj',
      status: true,
      score: 0
    };
    const player4:User={
      uid: 'JW1',
      name: 'John Walker',
      status: false,
      score: 10
    };
    this.playerList.push(player1,player2,player3,player4);
  }

  changeUser(){
    // Check whether we need status or not
    // this.playerList[this.count].status=true;
    this.count=Math.floor((Math.random()*100)%4);
    console.log("New count"+this.count)
  }
}
