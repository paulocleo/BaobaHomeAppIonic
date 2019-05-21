import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CozinhaPage } from '../pages/cozinha/cozinha';
import { HttpModule } from '@angular/http';
import { EnergiaPage } from '../pages/energia/energia';
import { EnergiaAddPage } from '../pages/energia-add/energia-add';
import { AcionamentoWsProvider } from '../providers/acionamento-ws/acionamento-ws';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CozinhaPage,
    EnergiaPage,
    EnergiaAddPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CozinhaPage,
    EnergiaPage,
    EnergiaAddPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AcionamentoWsProvider,
    //EnergiaWsProvider
    //FeiraaddwsProvider,
    //FeirawsProvider
  ]
})
export class AppModule {}
