import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { WaitingRoomComponent } from './components/waiting-room/waiting-room.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NewGameComponent,
    WaitingRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
