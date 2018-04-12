import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../home/home';
import { BookingPage } from '../booking/booking';

@IonicPage()
@Component({
  selector: 'page-tour-details',
  templateUrl: 'tour-details.html',
})
export class TourDetailsPage {

	tour: any;
	tour_id: any;
  currency: any;

  	constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public loadingCtrl: LoadingController, public storage: Storage) {

  		this.tour_id = navParams.get('tour_id');
  		this.getTour(this.tour_id);
      this.currency = 'جنيه';
  	}

  	ionViewDidLoad() {
    	//console.log('ionViewDidLoad TourDetailsPage');
  	}

  	getTour(tour_id) {
      this.storage.get('stour_details_'+tour_id).then((storedTourDetails) => {
         if(!storedTourDetails) {
            let loading = this.loadingCtrl.create({
                content: 'جاري التحميل ...',
                duration: 10000,
            });
            loading.present();

      		  this.restProvider.getTourDetails(tour_id)
              .then(data => {
          		  this.tour_id = tour_id;
            		this.tour = data;
                this.storage.set('stour_details_'+tour_id, this.tour);
                loading.dismiss();
          	});
          } else {
            this.tour = storedTourDetails;
          }
      });
    }

  	backToHome() {
  		this.navCtrl.push(HomePage);
  	}

    goToBooking(tour_id, tour, booking) {
      this.navCtrl.push(BookingPage, {
        tour_id: tour_id,
        tour: tour,
        booking: booking,
      });
    }

}