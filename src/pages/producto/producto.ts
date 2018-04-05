import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';

@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  item: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _cs: CarritoProvider) {
    this.item = this.navParams.get("item");
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProductoPage');
  }

}
