import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDisplay = true;
  clickTimeStamp = [];
  
  onTongle(){
    this.isDisplay = !this.isDisplay;
    this.clickTimeStamp.push(new Date());
  }
}
