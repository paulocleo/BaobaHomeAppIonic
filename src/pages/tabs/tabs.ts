import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CozinhaPage } from '../cozinha/cozinha';
import { EnergiaPage } from '../energia/energia';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = CozinhaPage;
  tab5Root = EnergiaPage;

  constructor() {

  }
}
