import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { TourDetailsPage } from '../tour-details/tour-details';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
   selector: 'page-tours',
   templateUrl: 'tours.html',
})
export class ToursPage {

   currency: any;
   tours: any;
   page_title: any;
   
   constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public loadingCtrl: LoadingController, public storage: Storage, private platform: Platform, public alertCtrl: AlertController, private network: Network) {

      this.currency = 'دولار';
      this.page_title = navParams.get('title');
      this.getTours(navParams.get('dept_id'));
   }

   ionViewDidLoad() {
      //console.log('ionViewDidLoad ToursPage');
   }

   getTours(dept_id) {

      this.platform.ready().then(() => {

         var status = false;
         if(this.network.type !== 'none' && navigator.onLine==true){
           status = true;
         } else if(this.network.type === 'none'){
           status = false;
         } else{
           status = false;
         }

         if(status != true)  { //no internet connection
            this.storage.get('stored_tours_'+dept_id).then((storedTours) => {
               if(!storedTours)
               {
                  let alert = this.alertCtrl.create({
                      title: "لا يوجد اتصال بالانترنت",
                      subTitle: 'عفوا يرجى التأكد من توافر اتصال بالانترنت لتتمكن من عرض الرحلات',
                      buttons: ["OK"]
                  });

                  alert.present();
               } else {
                  this.tours = storedTours;
               }
            });

         } else { //online
            let loading = this.loadingCtrl.create({
                content: 'جاري التحميل ...', duration: 10000,
            });
            loading.present();

            this.restProvider.getTours(dept_id)
               .then(data => {
                  this.tours = data;

                  this.storage.get('stored_tours_'+dept_id).then((storedTours) => {
                     if(!storedTours)
                     { //save to storage if not exists
                        this.storage.set('stored_tours_'+dept_id, this.tours);
                     }
                     else
                     { //if exists delete it, then save new one
                        this.storage.remove('stored_tours_'+dept_id);
                        this.storage.set('stored_tours_'+dept_id, this.tours);
                     }
                  });

                  loading.dismiss();
            });
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

   goToSearchPage() {
      this.navCtrl.push(SearchPage);
   }

}