import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AcionamentoWsProvider } from '../../providers/acionamento-ws/acionamento-ws';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[
    AcionamentoWsProvider
  ]
})
export class HomePage {

  luzQuarto01:string = '';
  listaAcionamentos = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public acionamentoProvider: AcionamentoWsProvider) {

      acionamentoProvider.getAcionamentosWS().subscribe(
        data=>{
            const response = (data as any);
            this.listaAcionamentos = JSON.parse(response._body);
            console.log(this.listaAcionamentos);
            this.mapeamentoDispositivos();
        },
        error=>{
          console.log(error);
        }
      )
      //this.luzQuarto01 = "true";
  }

  onClickQuarto01()
  {
    alert(this.luzQuarto01);
  }

  mapeamentoDispositivos()
  {
    this.listaAcionamentos.forEach(element => {
      
      switch(element.comodo){
        case "Quarto01":
          if(element.nome == "luzTeto")
          {
            this.luzQuarto01 = element.status;
          }          
          break;
      }
    });
  }

}
