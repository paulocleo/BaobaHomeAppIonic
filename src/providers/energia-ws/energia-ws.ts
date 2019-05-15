import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';

/*
  Generated class for the EnergiaWsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnergiaWsProvider {
  basepath = '/baobawsapi';
  
  constructor(
    public http: Http,
    private _plataform: Platform
    ) {
    console.log('Hello EnergiaWsProvider Provider');

    if(this._plataform.is("cordova")){
      this.basepath = "https://baobahomews.herokuapp.com";
    }
  }

  getEnergiaWS()
  {
    return this.http.get(`${this.basepath}/energias`);
  }

  salvarEnergia(medida:string, data:string, isConta:boolean)
  {
    return this.http.get(`${this.basepath}/addEnergia?medidaKhr=${medida}&data="${data}"&isConta=${isConta}`);
  }

  excluirEnergia(energia:any)
  {
    return this.http.get(`${this.basepath}/excluirEnergia?medidaKhr=${energia.medidaKwh}&data="${energia.dataMedida}"&isConta=${energia.flagConta}&key=${energia.key}`)
  }

}
