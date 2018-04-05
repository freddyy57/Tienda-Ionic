import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { CarritoProvider } from '../../providers/carrito/carrito';

@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _cs: CarritoProvider,
              private viewCtrl: ViewController) {
  }



}
