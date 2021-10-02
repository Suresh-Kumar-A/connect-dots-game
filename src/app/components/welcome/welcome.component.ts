import { Component, OnInit } from '@angular/core';
import { createPopper } from '@popperjs/core';
import tippy from 'tippy.js';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  box={
    left:true,
    right:true,
    top:true,
    bottom:true,
    title:'Sample Title',
    body:''
  }
  count=0;

  constructor() { }

  ngOnInit(): void {
    // this.sampleTest();
  }

  sampleTest(){
    this.count++;
    this.box.title="Finally changed"+this.count;
    this.box.body="you won't beleive it worked!"  
    if(this.count%2==0){
      this.box.left=false;
      this.box.top=true;

    }
    
    
    if(this.count%3==0){
      this.box.top=false;
      this.box.left=true;

    }
    
  }

  clickedLeft(){
    console.log("Left")
  }
  clickedRight(){
    console.log("Right")
  }
  clickedTop(){
    console.log("Top")
  }
  clickedBottom(){
    console.log("Bottom")
  }
}
