import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {

  constructor(public authService: AuthService, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    // var ui = new firebaseui.auth.AuthUI(this.auth);
    // The start method will wait until the DOM is loaded.
    // ui.start('#firebaseui-auth-container', this.uiConfig);
  }


  
  // async login(){
  //   await this.authService.googleSignIn()
  // }
}
