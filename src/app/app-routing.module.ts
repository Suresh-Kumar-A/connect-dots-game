import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewGameComponent } from './components/new-game/new-game.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [{
  path:'',
  component: WelcomeComponent
},{
  path:'new-game',
  component: NewGameComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
