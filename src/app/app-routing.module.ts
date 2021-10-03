import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewGameComponent } from './components/new-game/new-game.component';
import { WaitingRoomComponent } from './components/waiting-room/waiting-room.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [{
  path: 'sample',
  component: WelcomeComponent
}, {
  path: '',
  component: NewGameComponent
}, {
  path: 'waiting-room',
  component: WaitingRoomComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
