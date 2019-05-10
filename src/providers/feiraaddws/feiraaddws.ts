
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the FeiraaddwsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FeiraaddwsProvider {

  basepath = '/baobawsapi';

  constructor(
    public http: Http,
    private _plataform: Platform) {
    console.log('Hello FeiraaddwsProvider Provider');

    if (this._plataform.is("cordova")) {
      this.basepath = "https://baobahomews.herokuapp.com";
    }
  }

  consumir() {
    return this.http.get(`${this.basepath}/feiras`);
  }
  consumirProduto(feira: any) {

    feira.quantidade = feira.quantidade - 1;
    return this.http.get(`${this.basepath}/addfeira?barras=${feira.codigoBarras}&data="${feira.dataVencimento}"&nome="${feira.nomeProduto}"&preco=${feira.preco}&quantidade=${feira.quantidade}&fastTime=${feira.fastTimeData}`);
  }
}
