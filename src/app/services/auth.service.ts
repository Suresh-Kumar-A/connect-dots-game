import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';
import { Observable } from 'rxjs';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: User = {
    uid: '',
    avatarClassList: '',
    name: '',
    status: false,
    score: 0
  };
  constructor(private auth: AngularFireAuth) {
    // this.user$ = auth.user;
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const session = await this.auth.signInWithPopup(provider)
    console.log(session);
    if (session.user != null && session.user != undefined) {
      this.user$.uid = session.user.uid;
      this.user$.name = session.user.displayName !== null ? session.user.displayName : '';
    }
    console.log(this.user$)
  }

  async signOut() {
    console.log(this.user$)
    await this.auth.signOut().then(()=>{
      this.user$ = {
        uid: '',
        avatarClassList: '',
        name: '',
        status: false,
        score: 0
      };
    });
    console.log(this.user$)
  }
}
