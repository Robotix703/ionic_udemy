import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from '../../places.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  placeSub: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')) {
        this.navCtrl.navigateBack("/places/offers");
        return;
      }
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
      });
    });
  }

  onBookPlace(){
    this.actionSheetCtrl.create({
      header: "Choose an Action",
      buttons: [
        {
          text: "Select Date",
          handler: () => {
            this.openBookingModal("select");
          }
        },
        {
          text: "Random Date",
          handler: () => {
            this.openBookingModal("random");
          }
        },
        {
          text: "Cancel",
          role: "destructive"
        }
      ]
    })
    .then(actionSheetEl => {
      actionSheetEl.present();
    })
  }

  openBookingModal(mode: 'select' | 'random'){
    console.log(mode);

    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.place}
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData);
    })
  }

  ngOnDestroy(): void {
    this.placeSub.unsubscribe();
  }
}
