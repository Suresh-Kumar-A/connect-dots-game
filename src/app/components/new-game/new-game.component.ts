import { Component, OnInit } from '@angular/core';
import { Box } from 'src/app/_model/box';
import { User } from 'src/app/_model/user';
import swal from 'sweetalert';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  playerList: User[] = [];
  currentUserIndex = 0;
  highScore = 0;
  numOfBoxed = 20;
  boxList: Box[] = [];
  avatarClassList = ['fab fa-optin-monster', 'fab fa-grunt', 'fab fa-earlybirds', 'fab fa-grav', 'fas fa-bacterium',
    'fab fa-jenkins', 'fab fa-keybase', 'fab fa-linux', 'fas fa-football-ball', 'fab fa-gitkraken'];

  constructor() { }

  ngOnInit(): void {
    this.addSamplePlayers();
    this.addSampleBox(20);
  }

  private addSamplePlayers() {
    const player1: User = {
      uid: 'SK1',
      name: 'Suresh Kumar',
      status: false,
      score: 0,
      avatarClassList: this.getRandomAvatar()
    };
    const player2: User = {
      uid: 'DR1',
      name: 'Dinesh Raj',
      status: false,
      score: 0,
      avatarClassList: this.getRandomAvatar()
    };
    const player3: User = {
      uid: 'AR1',
      name: 'Amit Raj',
      status: true,
      score: 0,
      avatarClassList: this.getRandomAvatar()
    };
    const player4: User = {
      uid: 'JW1',
      name: 'John Walker',
      status: false,
      score: 0,
      avatarClassList: this.getRandomAvatar()
    };
    this.playerList.push(player1, player2, player3, player4);
  }

  private addSampleBox(size: number) {
    for (let i = 0; i < size; i++) {
      this.boxList[i] = {
        id: i,
        ownerId: '',
        status: false,
        ownerAvatar: '',
        position: [
          {
            status: false,
            ownerId: ''
          },
          {
            status: false,
            ownerId: ''
          },
          {
            status: false,
            ownerId: ''
          },
          {
            status: false,
            ownerId: ''
          }
        ]
      };
    }
  }

  private getRandomAvatar(): string {
    return this.avatarClassList[Math.floor((Math.random() * 100) % 10)];
  }

  markBoxPosition(box: Box) {
    // console.log(box)
    swal({
      buttons: {
        Left: { text: "LEFT", value: "left", className: 'btn-danger', visible: !box.position[0].status },
        Right: { text: "RIGHT", value: "right", className: 'btn-dark', visible: !box.position[1].status },
        Top: { text: "TOP", value: "top", className: 'btn-success', visible: !box.position[2].status },
        Bottom: { text: "Bottom", value: "bottom", className: 'btn-warning', visible: !box.position[3].status }
      },
    })
      .then((value: any) => {
        switch (value) {
          case "left": {
            // console.log("left")
            this.boxList[box.id].position[0].status = true;
            this.checkBoxCompletion(box.id);
          }
            break;
          case "right": {
            // console.log("right")
            this.boxList[box.id].position[1].status = true;
            this.checkBoxCompletion(box.id);
          }
            break;
          case "top": {
            // console.log("top")
            this.boxList[box.id].position[2].status = true;
            this.checkBoxCompletion(box.id);
          }
            break;
          case "bottom": {
            // console.log("bottom")
            this.boxList[box.id].position[3].status = true;
            this.checkBoxCompletion(box.id);
          }
            break;
          default:
          // console.log("Nothing");
        }
        this.changeActiveUser();
      });
  }

  private checkBoxCompletion(id: number) {
    const left = this.boxList[id].position[0].status;
    const right = this.boxList[id].position[1].status;
    const top = this.boxList[id].position[2].status;
    const bottom = this.boxList[id].position[3].status;
    if (left && right && top && bottom) {
      this.boxList[id].status = true;
      this.boxList[id].ownerAvatar = this.playerList[this.currentUserIndex].avatarClassList;
      this.playerList[this.currentUserIndex].score++;
      // this.playerList.forEach((user, index) => {
      //   if (user.score > this.highScore) {
      //     this.highScore = user.score;
      //   }
      // });
      for (let i = 0; i < this.playerList.length; i++) {
        let user = this.playerList[i];
        if (user.score > this.highScore) {
          this.highScore = user.score;
          break;
        }
      }
    }
  }

  private changeActiveUser() {
    // making next user active
    this.currentUserIndex++;
    this.currentUserIndex = this.currentUserIndex > 3 ? (this.currentUserIndex % 4) : this.currentUserIndex;
  }
}
