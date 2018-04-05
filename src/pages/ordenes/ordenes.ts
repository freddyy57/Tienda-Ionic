import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CarritoProvider } from '../../providers/carrito/carrito';

import { OrdenesDetallePage } from '../index.paginas';

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  ordenesDetalle = OrdenesDetallePage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _cs: CarritoProvider) {
  }

  ionViewWillEnter() {
    console.log('cargando ordenes...');
    this._cs.cargar_ordenes();
  }

}
