import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Start',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Listy zakupów',
      url: '/shopping-lists',
      icon: 'basket'
    },
    {
      title: 'PDF',
      url: '/pdf',
      icon: 'document'
    },
    {
      title: 'Zdjęcia paragonów',
      url: '/image',
      icon: 'image'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
