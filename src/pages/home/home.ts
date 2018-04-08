import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ToursPage } from '../tours/tours';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	departments: any;
	slides: any;

	constructor(public navCtrl: NavController, public restProvider: RestProvider, public loadingCtrl: LoadingController, public storage: Storage) {
		
		this.getTourDepartments();
		this.slides = [1,2,3,4,5];
	}

	getTourDepartments() {

		this.storage.get('stored_depts').then((storedDepts) => {

			if(!storedDepts) {
				let loading = this.loadingCtrl.create({
				    content: 'جاري التحميل ...',
				    duration: 8000,
				});
				loading.present();

		    	this.restProvider.getTourDepartments()
		    	.then(data => {
		      		this.departments = data;
		      		this.storage.set('stored_depts', this.departments);
		      		loading.dismiss();
		    	});

			} else {
				this.departments = storedDepts;
			}
		});
	}

	ToursPage(dept_id, title) {
		this.navCtrl.push(ToursPage, {
			dept_id:dept_id,
			title: title,
		});
	}
}
