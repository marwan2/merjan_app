import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../providers/rest/rest';

import { HomePage } from '../pages/home/home';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ContactPage } from '../pages/contact/contact';
import { ToursPage } from '../pages/tours/tours';
import { SearchPage } from '../pages/search/search';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, id: any}>;
  departments: any;
  mtDataVersion: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage, public restProvider: RestProvider, public alertCtrl: AlertController) {
    this.initializeApp();
    this.platform.setDir('rtl', true);

    this.pages = [
      { title: 'الرئيسية', component: HomePage, id: 0 },
      { title: 'من نحن', component: AboutusPage, id: 0 },
      { title: 'البحث', component: SearchPage, id: 0 },
    ];


    this.storage.get('stored_depts').then((storedDepts) => {
        if(!storedDepts) {
            this.restProvider.getTourDepartments()
                .then(data => {
                    this.departments = data;
                    this.storage.set('stored_depts', this.departments);
                    this.departments.forEach((dept)=>{
                        this.pages.push({ title:dept.name, component:'ToursPage', id:dept.id });
                    });
            });
        } else {
            storedDepts.forEach((dept)=>{
                this.pages.push({ title:dept.name, component:'ToursPage', id:dept.id });
            });
        }

        this.pages.push({ title: 'تواصل معنا', component: ContactPage, id: 0 });
    });


    //Check Connection, Get Data Version to compare with localstorage version, to notify user about new updates
    this.platform.ready().then(() => {
       var status = navigator.onLine;
       if(status == true)  { //internet connection found
          //get from API the latest dataVersion
          this.restProvider.getDataVersion().then(data => {
              
              this.mtDataVersion = data.data_version;
              this.storage.get('mt_data_version').then((localDataVersion) => {
                  if(!localDataVersion) // not found, save new one, no popup alerts
                  {
                    this.storage.set('mt_data_version', this.mtDataVersion);
                  }
                  else //if exists compare between it and API, 
                  {
                    if(this.mtDataVersion != localDataVersion) {
                      //show alert
                      let alert = this.alertCtrl.create({
                          title: "تحديث جديد",
                          message: 'هناك تحديثات جديدة في برامج الرحلات, اطلع عليها الأن',
                          buttons: [
                            {
                              text: 'شكرا',
                              handler: () => {}
                            }, {
                              text: 'أحدث الرحلات',
                              handler: () => {
                                this.goToToursPage(0, 'أحدث الرحلات');
                              }
                            }
                          ]
                      });
                      alert.present();

                      //delete current localDataVersion, then save new one
                      this.storage.remove('mt_data_version');
                      this.storage.set('mt_data_version', this.mtDataVersion);
                    } else {
                      //dataVersion are the same, nothing to do
                    }
                  }
              });
          });
        }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });
  }

    openPage(page) {
        if(page.component == 'ToursPage') {
            this.goToToursPage(page.id, page.title); return false;
        }

        this.nav.setRoot(page.component);
    }

    goToToursPage(dept_id, title) {
        this.nav.push(ToursPage, {
            dept_id:dept_id,
            title: title,
        });
    }

    goToSearchPage() {
        this.nav.push(SearchPage);
    }
}
