import { Component, OnInit } from '@angular/core';
import { Box } from 'src/app/_model/box';
import { User } from 'src/app/_model/user';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  playerList: User[] = [];
  currentUserIndex = 0;
  highScore = 0;
  numOfBoxes = 20;
  filledBoxes = 0;
  boxList: Box[] = [];
  avatarClassList = ['fab fa-optin-monster', 'fab fa-grunt', 'fab fa-earlybirds', 'fab fa-grav', 'fas fa-bacterium',
    'fab fa-jenkins', 'fab fa-keybase', 'fab fa-linux', 'fas fa-football-ball', 'fab fa-gitkraken'];
  numOfPlayers = 0;

  // don't give 0 as key to radio options, it will not work
  options = {
    1: this.getAvatarWithTag(this.avatarClassList[0]),
    2: this.getAvatarWithTag(this.avatarClassList[1]),
    3: this.getAvatarWithTag(this.avatarClassList[2]),
    4: this.getAvatarWithTag(this.avatarClassList[3]),
    5: this.getAvatarWithTag(this.avatarClassList[4]),
    6: this.getAvatarWithTag(this.avatarClassList[5]),
    7: this.getAvatarWithTag(this.avatarClassList[6]),
    8: this.getAvatarWithTag(this.avatarClassList[7]),
    9: this.getAvatarWithTag(this.avatarClassList[8]),
    10: this.getAvatarWithTag(this.avatarClassList[9])
  };
  constructor() { }

  ngOnInit(): void {
    this.getMatchDetails();
    // this.addSamplePlayers();
    this.addBoxes(this.numOfBoxes);
  }

  // used for Debugging | get sample users
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

  private addBoxes(size: number) {
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

  // used for Debugging | getting random avatar
  private getRandomAvatar(): string {
    return this.avatarClassList[Math.floor((Math.random() * 100) % 10)];
  }

  markBoxPosition(box: Box) {
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
            this.boxList[box.id].position[0].status = true;
            this.checkBoxCompletion(box.id);
          }
            break;
          case "right": {
            this.boxList[box.id].position[1].status = true;
            this.checkBoxCompletion(box.id);
          }
            break;
          case "top": {
            this.boxList[box.id].position[2].status = true;
            this.checkBoxCompletion(box.id);
          }
            break;
          case "bottom": {
            this.boxList[box.id].position[3].status = true;
            this.checkBoxCompletion(box.id);
          }
            break;
          default:
            console.info("Nothing is selected");
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
      this.filledBoxes++;
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
    if (this.filledBoxes !== this.numOfBoxes) {
      this.currentUserIndex++;
      this.currentUserIndex = this.currentUserIndex > (this.numOfPlayers - 1) ? (this.currentUserIndex % this.numOfPlayers) : this.currentUserIndex;
    }
    else
      this.gameOverShowResult();
  }

  private gameOverShowResult() {
    let winnerList: User[] = [];
    for (let i = 0; i < this.playerList.length; i++) {
      let user = this.playerList[i];
      if (user.score === this.highScore) {
        this.highScore = user.score;
        winnerList.push(user);
      }
    }

    if (winnerList.length == 1) {
      // Show winner profile info
      Swal.fire({
        title: 'Congratulation ' + winnerList[0].name + '. You won the match',
        iconHtml: '<i class="' + winnerList[0].avatarClassList + '"></i>',
        showConfirmButton: true
      });
    }
    else if (winnerList.length > 1) {
      // Multiple winner - show their profile
      Swal.fire({
        title: 'Congratulations Multiple player won this match',
        showConfirmButton: true
      })
    } else {
      // No winner - Game may be cancelled
      console.log("No winner game may be cancelled")
    }
  }

  private getMatchDetails() {
    Swal.fire({
      title: 'Select Number of Players',
      input: 'select',
      inputOptions: {
        2: '2 Players',
        3: '3 Players',
        4: '4 Players',
        7: '7 Players',
        10: '10 Players',
        // 0: 'Custom'
      },
      confirmButtonText: 'Continue <i class="far fa-hand-point-right"></i>'
    }).then((response) => {
      this.getPlayerDetails(response.value);
    })
  }

  private async getPlayerDetails(count: number) {
    // Initialize empty plyers
    this.playerList = new Array(count);
    // Fill player info with data from user
    for (let i = 0; i < count; i++) {
      await this.getPlayerName(i).then((response) => {
        this.playerList[i] = {
          uid: "UID_" + i,
          avatarClassList: '',
          name: response.value,
          status: false,
          score: 0
        };
        return this.getPlayerAvatar(i);
      }).then((response) => {
        this.playerList[i].avatarClassList = this.avatarClassList[response.value - 1];
        this.numOfPlayers++;
      });
    }
  }

  private getPlayerName(index: number) {
    return Swal.fire({
      title: 'Enter your name: Player - ' + (index + 1),
      input: 'text',
      inputPlaceholder: 'Enter your Name',
      inputValue: 'Player ' + (index + 1),
      inputValidator: result => !result ? 'Your name should not be Empty!' : null
    })
  }
  private getPlayerAvatar(index: number) {
    return Swal.fire({
      title: 'Choose your avatar: Player - ' + (index + 1),
      input: 'radio',
      width: '50rem',
      inputOptions: this.options,
      inputValue: index + 1,
      inputValidator: result => !result ? 'You need to select your avatar!' : null
    })
  }

  private getAvatarWithTag(className: string): string {
    return '<i class="fa-2x ' + className + '"></i>';
  }
}

    // Implement in future
    //   Swal.fire({
    //     html:`<div class="card-group">
    //     <div class="card">
    //         <div class="card-body">
    //             <i class="fa-3x fas fa-user-friends"></i>
    //             <div class="card-title">2 Players</div>
    //         </div>
    //     </div>
    //     <div class="card">
    //         <div class="card-body">
    //             <i class="fa-3x fas fa-users"></i>
    //             <div class="card-title">4 Players</div>
    //         </div>
    //     </div>
    //     <div class="card">
    //         <div class="card-body">
    //             <i class="fa-3x fas fa-users-cog"></i>
    //             <div class="card-title">Custom</div>
    //         </div>
    //     </div>
    // </div>`
    //   })