import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrivacyPage } from '../privacy/privacy';
import { TermsPage } from '../terms/terms';

@IonicPage()
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
  }

  goToPrivacy() {
  	this.navCtrl.push(PrivacyPage);
  }

  goToTerms() {
  	this.navCtrl.push(TermsPage);
  }
}
