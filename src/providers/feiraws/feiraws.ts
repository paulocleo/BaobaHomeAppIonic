import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';

/*
  Generated class for the FeirawsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FeirawsProvider {
  basepath = '/baobawsapi';
  constructor(
    public http: Http,
    private _plataform: Platform
    ) {
    console.log('Hello FeirawsProvider Provider');
    console.log(_plataform);
    if(this._plataform.is("mobile")){
      this.basepath = "https://baobahomews.herokuapp.com";
    }
  }

  getFeiraWs(){
    return this.http.get(`${this.basepath}/feiras`);
  }

}
