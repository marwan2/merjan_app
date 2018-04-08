import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { TourDetailsPage } from '../tour-details/tour-details';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
   selector: 'page-tours',
   templateUrl: 'tours.html',
})
export class ToursPage {

   tours: any;
   page_title: any;
   
   constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public loadingCtrl: LoadingController, public storage: Storage) {

      this.page_title = navParams.get('title');
      this.getTours(navParams.get('dept_id'));
   }

   ionViewDidLoad() {
      //console.log('ionViewDidLoad ToursPage');
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

   backToHome() {
   	this.navCtrl.push(HomePage);
   }

}
