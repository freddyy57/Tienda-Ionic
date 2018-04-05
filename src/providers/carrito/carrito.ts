import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../usuario/usuario';

import { AlertController, Platform, ModalController } from 'ionic-angular';

// páginas del modal
import { LoginPage, CarritoPage } from '../../pages/index.paginas';

import { URL_SERVICIOS } from '../../config/url.servicios';


@Injectable()
export class CarritoProvider {

  items:any[] = [];
  total_carrito:number = 0;
  ordenes:any[] = [];

  constructor(public http: Http,
              private alertCtrl:AlertController,
              private storage: Storage,
              private modalCtrl: ModalController,
              private platform: Platform,
              private _us: UsuarioProvider) {
    // console.log('Hello CarritoProvider Provider');
    this.cargar_storage();
    this.actualizar_total();
  }

  remover_item( idx: number ) {
    this.items.splice(idx,1);
    this.guardar_storage();
  }

  realizar_pedido() {

    let data = new URLSearchParams();
    let codigos:string[] = [];

    for( let item of this.items ) {
      codigos.push( item.codigo );
    }
    // console.log( codigos );
    data.append("items", codigos.join(","));
    // console.log( codigos.join(",") );

    let url = URL_SERVICIOS + "/pedidos/realizar_orden/" + this._us.token + "/" + this._us.id_usuario;

    this.http.post( url, data )
           .subscribe( (res: any) => {
             let respuesta = res.json();
             if( respuesta.error ) {
               // mostramos error
               this.alertCtrl.create({
                 title: "ERROR",
                 subTitle: respuesta.mensaje,
                 buttons: ["OK"]
               }).present();
             } else {
               // todo bien
               this.items = [];
               this.guardar_storage();
               this.alertCtrl.create({
                 title: "PEDIDO REALIZADO",
                 subTitle: "Su pedido se ha realizado correctamente",
                 buttons: ["OK"]
               }).present();
             }
           })

  }

  ver_carrito() {

      let modal:any;

      if( this._us.token ) {
        // mostrar página del carrito
        modal = this.modalCtrl.create( CarritoPage );
      } else {
       // mostrar el login
        modal = this.modalCtrl.create( LoginPage );
    }

    modal.present();

    modal.onDidDismiss( (abrirCarrito:boolean) => {
        if( abrirCarrito) {
          this.modalCtrl.create( CarritoPage ).present();
        }
    })
  }

  agregar_carrito( item_parametro:any ) {
    for( let item of this.items ) {
      if( item.codigo == item_parametro.codigo ) {
        this.alertCtrl.create({
          title: "Item existe",
          subTitle: item_parametro.producto + " ya había sido añadido al carrito",
          buttons: ["OK"]
        }).present();

        return;
      }
    }
    this.items.push( item_parametro );
    // actualizar total_carrito
    this.actualizar_total();
    // guardar en el storage
    this.guardar_storage();
    // avisar al usuario
    this.alertCtrl.create({
      title: "Articulo Añadido",
      subTitle: item_parametro.producto + "se ha añadido al carrito",
      buttons: ["OK"]
    }).present();
  }

  actualizar_total() {
    this.total_carrito = 0;
    for( let item of this.items ) {
      this.total_carrito += Number( item.precio_compra );
    }
  }

  private guardar_storage() {

      if( this.platform.is("cordova") ) {
        // dispositivo
        this.storage.set('items', this.items );

      } else {
      // ordenador de mesa
      localStorage.setItem("items", JSON.stringify( this.items ) );
    }
  }

  cargar_storage() {

    let promesa = new Promise( ( resolve, reject ) => {

        if( this.platform.is("cordova") ) {
          // dispositivo
          this.storage.ready()
                  .then( () => {
                    this.storage.get('items').then((val) => {
                      console.log(val);
                      if(val) {
                        this.items = val;
                      }
                      resolve();

                    });
                  })
        } else {
        // ordenador
        if( localStorage.getItem("items") ) {
         // existe
         this.items = JSON.parse( localStorage.getItem("items") );
        }

        resolve();

      }
    });

    return promesa;

  }

  cargar_ordenes() {
    let url = URL_SERVICIOS + "/pedidos/obtener_pedidos/" + this._us.token + "/" + this._us.id_usuario;
    this.http.get( url )
            .map( res => res.json() )
            .subscribe( data => {
              if( data.error) {

                this.alertCtrl.create({
                  title: "ERROR",
                  subTitle: data.mensaje,
                  buttons: ["OK"]
                }).present();

              } else {

                this.ordenes = data.ordenes;

              }
            })
  }

  borrar_orden( orden_id:string ) {

    let url = URL_SERVICIOS + "/pedidos/borrar_pedido/" + this._us.token + "/" +  this._us.id_usuario + "/" + orden_id;

    return this.http.delete( url )
              .map( res => res.json() );

  }

}
