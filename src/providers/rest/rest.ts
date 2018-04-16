import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestProvider {

	apiUrl = 'http://mt.com.iq/ar/api';

  	constructor(public http: HttpClient) {
    	console.log('RestProvider Provider initialized');
  	}

  	getTourDepartments() {
	  	return new Promise(resolve => {
	    	this.http.get(this.apiUrl+'/all_depts').subscribe(data => {
	      		resolve(data);
	    	}, err => {
	      		console.log(err);
	    	});
	  	});
	}

	getTours(dept_id) {
		return new Promise(resolve => {
			this.http.get(this.apiUrl+ '/your_holidays/'+dept_id).subscribe(data=>{
				resolve(data);
			}, err=> {
				console.log('Error to get tours of id: ' + dept_id);
				console.log(err);
			});
		});
	}

	getTourDetails(tour_id) {
		return new Promise(resolve => {
			this.http.get(this.apiUrl+ '/PLDetails/'+tour_id).subscribe(data=>{
				resolve(data);
			}, err=> {
				console.log('Error to get tour details of id ' + tour_id);
				console.log(err);
			});
		});
	}

	searchTours(keyword) {
		return new Promise(resolve => {
			this.http.get(this.apiUrl+ '/your_holidays/0?Destination='+keyword).subscribe(data=>{
				resolve(data);
			}, err=> {
				console.log('Error while searching tours, keyword:' + keyword);
				console.log(err);
			});
		});
	}

	addUser(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.apiUrl+'/users', JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}

}