import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

	tour_id: any;
  tour: any;

  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  		this.tour_id = navParams.get('tour_id');
  		this.tour = navParams.get('tour');
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

}
