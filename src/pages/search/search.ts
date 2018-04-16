import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { TourDetailsPage } from '../tour-details/tour-details';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

	searchResults: any;
	currency: any;
	searchForm: FormGroup;

  	constructor(public navCtrl: NavController, 
  		public navParams: NavParams, 
  		public restProvider: RestProvider, 
  		public loadingCtrl: LoadingController,
  		private formBuilder: FormBuilder) {

  		this.currency = 'دولار';

  		this.searchForm = this.formBuilder.group({
	      keyword: ['', Validators.required]
	    });
  	}

  	submitSearch() {
  		var $keyword = '';
  		if (this.searchForm.valid)
  		{
	     	$keyword = this.searchForm.controls['keyword'].value;
	    }

  		let loading = this.loadingCtrl.create({
            content: 'جاري البحث ...',
            duration: 10000,
        });
        loading.present();

  		this.restProvider.searchTours($keyword)
          .then(data => {
        	this.searchResults = data;
            loading.dismiss();
      	});

  	}

  	tourDetails(tour_id) {
      	this.navCtrl.push(TourDetailsPage, {
         	tour_id: tour_id
      	});
   	}

  	ionViewDidLoad() {
    	//console.log('ionViewDidLoad SearchPage');
  	}

}
