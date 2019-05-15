import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { EnergiaWsProvider } from '../../providers/energia-ws/energia-ws';

/**
 * Generated class for the EnergiaAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-energia-add',
  templateUrl: 'energia-add.html',
  providers: [
    EnergiaWsProvider
  ]
})
export class EnergiaAddPage {

  dataHoje: string = "";
  checkConta: boolean = false;
  valMedidaKhr: string = "";
  arrayData: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertaController: AlertController,
    public energiaProvider: EnergiaWsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnergiaAddPage');
  }

  salvarEnergia() {
    if (this.dataHoje != '' && this.valMedidaKhr != '') {
      this.arrayData = this.dataHoje.split('-');
      this.dataHoje = this.arrayData[2] + '/' + this.arrayData[1] + '/' + this.arrayData[0];

      this.energiaProvider.salvarEnergia(this.valMedidaKhr, this.dataHoje, this.checkConta).subscribe(
        data => {
          console.log(data);
          console.log(this.dataHoje);
          this.alertaSucesso();

          this.dataHoje = "";
          this.valMedidaKhr = "";
        },
        error => {
          const response = (error as any);
          console.log(error);
          this.alertaError(response);
        }
      );
    }
    else {
      this.alertaObrigatoriedade();
    }
  }

  alertaObrigatoriedade() {
    const alert = this.alertaController.create({
      title: 'Campos Obrigatórios!',
      subTitle: 'Campos Medidas Khr e Data são obrigatórios!',
      buttons: ['OK']
    });
    alert.present();
  }

  alertaSucesso() {
    const alert = this.alertaController.create({
      title: 'Aviso!',
      subTitle: 'Salvo com sucesso!',
      buttons: ['OK']
    });
    alert.present();
  }

  alertaError(response:any) {

    const arrayRetorno:string[] = (response._body).split(',');

    const alert = this.alertaController.create({
      title: 'Error!',
      subTitle: 'Ops! Ocorreu algum erro. Verifique conexão com a internet.',
      message: arrayRetorno[1] + '<br>' + arrayRetorno[2],
      buttons: ['OK']
    });
    alert.present();
  }

}
