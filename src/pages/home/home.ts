import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  luzQuarto01:string = '';

  constructor(public navCtrl: NavController) {
    this.luzQuarto01 = "true";
  }

  onClickQuarto01()
  {
    alert(this.luzQuarto01);
  }

}
