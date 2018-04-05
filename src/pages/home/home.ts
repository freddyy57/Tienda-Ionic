import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductosProvider } from '../../providers/index.services';
import { ProductoPage } from '../producto/producto';
import { CarritoProvider } from '../../providers/carrito/carrito';

import { UsuarioProvider} from '../../providers/usuario/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private _ps: ProductosProvider,
              private _cs: CarritoProvider,
              private _us: UsuarioProvider) {

  }

  siguiente_pagina(infiniteScroll) {
    this._ps.cargar_todos()
           .then( () => {
             infiniteScroll.complete();
           })
  }

  irDetalle(item:any) {
    // console.log(item);
    this.navCtrl.push( ProductoPage, { 'item': item } );
  }

}
