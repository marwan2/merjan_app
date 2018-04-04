import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TourDetailsPage } from '../tour-details/tour-details';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
   selector: 'page-tours',
   templateUrl: 'tours.html',
})
export class ToursPage {

   tours: any;

   constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public loadingCtrl: LoadingController, public storage: Storage ) {

      this.getTours(navParams.get('dept_id'));
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad ToursPage');
   }

   getTours(dept_id) {

      this.storage.get('stored_tours_'+dept_id).then((storedTours) => {
         if(!storedTours) {
            let loading = this.loadingCtrl.create({
                content: 'جاري التحميل ...',
                duration: 10000,
            });
            loading.present();

            this.restProvider.getTours(dept_id)
            .then(data => {
               this.tours = data;
               this.storage.set('stored_tours_'+dept_id, this.tours);
               loading.dismiss();
            });
         } else {
            this.tours = storedTours;
         }
      });
   }

   tourDetails(tour_id) {
      this.navCtrl.push(TourDetailsPage, {
         tour_id: tour_id
      });
   }

   backToHome(tour_id) {
   	this.navCtrl.push(HomePage);
   }

}
