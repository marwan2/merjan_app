import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ToursPage } from '../pages/tours/tours';
import { TourDetailsPage } from '../pages/tour-details/tour-details';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ContactPage } from '../pages/contact/contact';
import { BookingPage } from '../pages/booking/booking';
import { PrivacyPage } from '../pages/privacy/privacy';
import { TermsPage }   from '../pages/terms/terms';
import { SearchPage }   from '../pages/search/search';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ToursPage,
    TourDetailsPage,
    BookingPage,
    AboutusPage,
    ContactPage,
    PrivacyPage,
    TermsPage,
    SearchPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ToursPage,
    TourDetailsPage,
    BookingPage,
    AboutusPage,
    ContactPage,
    PrivacyPage,
    TermsPage,
    SearchPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Network
  ]
})
export class AppModule {}
