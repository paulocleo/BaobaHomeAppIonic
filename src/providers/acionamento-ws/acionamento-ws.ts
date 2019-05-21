import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

/*
  Generated class for the AcionamentoWsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AcionamentoWsProvider {
  basepath = '/baobawsapi';

  constructor(
    public http: Http,
    private _plataform: Platform) {
    console.log('Hello AcionamentoWsProvider Provider'); 

    if(this._plataform.is("cordova")){
      this.basepath = "https://baobahomews.herokuapp.com";
    }
  }

  getAcionamentosWS()
  {
    return this.http.get(`${this.basepath}/acionamentos`);
  }

}
