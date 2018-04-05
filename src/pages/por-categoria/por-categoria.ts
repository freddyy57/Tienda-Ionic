import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from "../../providers/productos/productos";

import { ProductoPage } from "../producto/producto";

@Component({
  selector: 'page-por-categoria',
  templateUrl: 'por-categoria.html',
})
export class PorCategoriaPage {

  categoria:any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _ps: ProductosProvider) {

    this.categoria = this.navParams.get("categoria");

    this._ps.cargar_por_categorias( this.categoria.id );
  }

  irDetalle(item:any) {
     console.log(item);
     this.navCtrl.push( ProductoPage, { 'item': item } );
  }


}
