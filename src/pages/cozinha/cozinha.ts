import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FeirawsProvider } from '../../providers/feiraws/feiraws';

/**
 * Generated class for the CozinhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cozinha',
  templateUrl: 'cozinha.html',
  providers: [
    FeirawsProvider
  ]
})
export class CozinhaPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public feiraProvider: FeirawsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CozinhaPage');

    this.feiraProvider.getFeiraWs().subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    );
  }

}
