import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TourDetailsPage } from './tour-details';

@NgModule({
  declarations: [
    TourDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TourDetailsPage),
  ],
})
export class TourDetailsPageModule {}
