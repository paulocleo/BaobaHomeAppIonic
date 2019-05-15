import { Component } from '@angular/core';
import { NavController, NavParams, Loading } from 'ionic-angular';
import { EnergiaWsProvider } from '../../providers/energia-ws/energia-ws';
import { AlertController } from 'ionic-angular';
import { EnergiaAddPage } from '../energia-add/energia-add';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the EnergiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-energia',
  templateUrl: 'energia.html',
  providers: [
    EnergiaWsProvider
  ]
})
export class EnergiaPage {

  listaEnergias = new Array<any>();  
  dataHoje: String = new Date().toISOString();
  public loader: Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public energiaWsProvider: EnergiaWsProvider,
    public alertController: AlertController,
    public loadControl: LoadingController) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnergiaPage');
    this.loadingList();
    this.carregarListaEnergia();    
  }

  carregarListaEnergia()
  {
    this.energiaWsProvider.getEnergiaWS().subscribe(
      data=>{
        const response = (data as any);
        this.listaEnergias = JSON.parse(response._body);
        console.log(this.listaEnergias);
        this.loader.dismiss();
      },
      error=>{
        console.log(error);
        console.log("Entrou no error");
        this.loader.dismiss();
      }
    )
  }

  onClickAddEnergia()
  {   
    this.navCtrl.push(EnergiaAddPage);
  }

  loadingList() {
    this.loader = this.loadControl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }

  onClickExcluirEnergia(energia:any)
  {
    this.energiaWsProvider.excluirEnergia(energia).subscribe(
      data=>{
        console.log(data);
        this.confirmacaoExcluir();

      },
      error=>{
        console.log(error);
        console.log("Entrou no error");
        this.alertaError(error);
      }
    )
    console.log(energia.medidaKwh); 
  }

  confirmacaoExcluir()
  {
    const popConfirmacao = this.alertController.create({
      title: 'Confirmação!',
      message: `Deseja excluir?`,      
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
            this.alertaExcluir();
          }
        }
      ]
    });
    popConfirmacao.present();
  }

  alertaExcluir() {
    const alert = this.alertController.create({
      title: 'Aviso!',
      subTitle: 'Exluído com sucesso!',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            console.log('OK clicked');
            this.carregarListaEnergia();
          }
        }
      ]
    });
    alert.present();
  }

  alertaError(response:any) {

    const arrayRetorno:string[] = (response._body).split(',');

    const alert = this.alertController.create({
      title: 'Error!',
      subTitle: 'Ops! Ocorreu algum erro. Verifique conexão com a internet.',
      message: arrayRetorno[1] + '<br>' + arrayRetorno[2],
      buttons: ['OK']
    });
    alert.present();
  }

}
