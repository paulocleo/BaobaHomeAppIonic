import { Component } from '@angular/core';
import { NavController, NavParams, Loading } from 'ionic-angular';
import { FeirawsProvider } from '../../providers/feiraws/feiraws';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

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

  public listaFeira = new Array<any>();
  public loader:Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public feiraProvider: FeirawsProvider,
    public alertControl: AlertController,
    public loadControl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CozinhaPage');
    this.loadingList();
    this.feiraProvider.getFeiraWs().subscribe(
      data=>{        
        const response = (data as any);
        this.listaFeira = JSON.parse(response._body);
        console.log(this.listaFeira);
        this.loader.dismiss();
      },
      error=>{
        this.loader.dismiss();
        this.showAlertaConexao();
        console.log("Entrou no error");
        console.log(error);
      }
    );
  }

  showAlertaConexao() {
    const alert = this.alertControl.create({
      title: 'Ops! Algo Errado.',
      subTitle: 'Verifique conexão com a Internet!',
      buttons: ['OK']
    });
    alert.present();
  }

  loadingList() {
    this.loader = this.loadControl.create({
      content: "Carregando..."
    });
    this.loader.present();    
  }
}
