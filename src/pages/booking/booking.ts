import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TourDetailsPage } from '../tour-details/tour-details';
import { ContactPage } from '../contact/contact';

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

	tour_id: any;
  tour: any;
  booking: any;

  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  		this.tour_id = navParams.get('tour_id');
  		this.tour = navParams.get('tour');
      this.booking = navParams.get('booking');
  	}

    goToTour(tour_id) {
      this.navCtrl.push(TourDetailsPage, {
        tour_id: tour_id
      })
    }

    goToContact(tour_name) {
      this.navCtrl.push(ContactPage, {
        tour_name: tour_name
      })
    }

}
