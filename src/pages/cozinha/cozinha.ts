import { Component } from '@angular/core';
import { NavController, NavParams, Loading } from 'ionic-angular';
import { FeirawsProvider } from '../../providers/feiraws/feiraws';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { FeiraaddwsProvider } from '../../providers/feiraaddws/feiraaddws';

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
    FeirawsProvider,
    FeiraaddwsProvider
  ]
})
export class CozinhaPage {

  public listaFeira = new Array<any>();
  public loader: Loading;
  valBusca: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public feiraProvider: FeirawsProvider,
    public feiraAddProvider: FeiraaddwsProvider,
    public alertControl: AlertController,
    public loadControl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CozinhaPage');
    this.loadingList();
    this.feiraProvider.getFeiraWs(this.valBusca).subscribe(
      data => {
        const response = (data as any);
        this.listaFeira = JSON.parse(response._body);

        console.log(this.listaFeira);
        this.loader.dismiss();
      },
      error => {
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

  onClickBtConsumir(feira: any) {

    const popConfirmacao = this.alertControl.create({
      title: 'Confirmação!',
      message: `Deseja consumir o produto ${feira.nomeProduto}?`,      
      buttons: [
        {
          text: 'Não',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: data => {
            console.log('Saved clicked');
            this.feiraAddProvider.consumirProduto(feira).subscribe(
              data => {
                const responseAdd = (data as any);
                //alert(responseAdd);
              }
            )
          }
        }
      ]
    });
    popConfirmacao.present();
  }

  onInput(event)
  {
    //alert(this.valBusca);
    this.carregarLista();
  }

  carregarLista()
  {
    this.feiraProvider.getFeiraWs(this.valBusca).subscribe(
      data => {
        const response = (data as any);
        this.listaFeira = JSON.parse(response._body);
        console.log(this.listaFeira);
   
      },
      error => {      
        console.log("Entrou no error");
        console.log(error);
      }
    );
  }
}
