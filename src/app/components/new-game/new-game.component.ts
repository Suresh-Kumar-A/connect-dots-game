import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/user';
import swal from 'sweetalert';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  playerList:User[]=[];
  count=0;
  // highScore=0;
  highScore=40;
  numOfBoxed=20;
  boxList=new Array(20);

  constructor() { }

  ngOnInit(): void {
    this.addSamplePlayers();
    // this.swal=require('sweetalert2');
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

  showOptionsPopup(){
    // Swal.fire({
    //   title: 'Auto close alert!',
    //   text: 'I will close in 2 seconds.',
    //   showCancelButton:true,
    //   showConfirmButton:true,
    //   showDenyButton:true,
    //   confirmButtonColor:'green',
    //   cancelButtonColor:'blue',
    //   denyButtonColor: 'orange'
    // })

    swal({
      buttons: {
        Top: { text: "TOP", value: "top", className:'btn-success'},
        Bottom: { text: "Bottom", value: "bottom",className:'btn-warning' },
        Left: { text: "LEFT", value: "left",className:'btn-danger' },
        Right: { text: "RIGHT", value: "right", className:'btn-dark'}
      },
    })
      .then((value: any) => {
        switch (value) {
          case "left": console.log("left")
            break;
          case "right": console.log("right")
            break;
          case "top":console.log("top")
            break;
          case "bottom": console.log("bottom")
            break;
          default:
            console.log("Nothing");
        }
      });

  }
}
