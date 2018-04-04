import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

	tour_id: any;

  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  		this.tour_id = navParams.get('tour_id');
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

}
