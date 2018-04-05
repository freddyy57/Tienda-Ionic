import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { URL_SERVICIOS } from '../../config/url.servicios';

import { AlertController, Platform } from 'ionic-angular';


@Injectable()
export class UsuarioProvider {

  token:string;
  id_usuario:string;

  constructor(public http: Http,
              private alertCtrl: AlertController,
              private platform: Platform,
              private storage: Storage) {
     // console.log('Hello UsuarioProvider Provider');
     this.cargar_storage();
  }

  activo():boolean {
    if( this.token ) {
      return true;
    } else {
      return false;
    }
  }

  ingresar( correo:string, contrasena:string ) {

    let data = new URLSearchParams();
    data.append("correo", correo);
    data.append("contrasena", contrasena);

    let url = URL_SERVICIOS + "/login";

    return this.http.post( url, data )
                    .map( res => {
                      let data_res = res.json();
                      console.log(data_res);
                      if( data_res.error) {
                        this.alertCtrl.create({
                          title: "Error al iniciar",
                          subTitle: data_res.mensaje,
                          buttons: ["OK"]
                        }).present();
                      } else {
                        this.token = data_res.token;
                        this.id_usuario = data_res.id_usuario;

                        // Guardar torage
                        this.guardar_storage();

                      }
                  });
  }


  cerrar_sesion() {
    this.token = null;
    this.id_usuario = null;
    this.guardar_storage();
  }


  private guardar_storage() {

      if( this.platform.is("cordova") ) {
        // dispositivo
        this.storage.set('token', this.token );
        this.storage.set('id_usuario', this.id_usuario );

      } else {
      // ordenador de mesa
      if( this.token) {

      localStorage.setItem( "token", this.token );
      localStorage.setItem( "id_usuario",  this.id_usuario );

    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("id_usuario");
    }

    }
  }

  cargar_storage() {

    let promesa = new Promise( ( resolve, reject ) => {

        if( this.platform.is("cordova") ) {
          // dispositivo
          this.storage.ready()
                  .then( () => {
                    this.storage.get('token').then((val) => {
                      console.log(val);
                      if(val) {
                        this.token = val;
                      }

                    })

                    this.storage.get('id_usuario').then((val) => {
                      console.log(val);
                      if(val) {
                        this.id_usuario = val;
                      }
                      resolve();

                    })

                  })
        } else {
        // ordenador
        if( localStorage.getItem("token") || localStorage.getItem("id_usuario")) {
         // existe
         this.token =  localStorage.getItem("token");
         this.id_usuario = localStorage.getItem("id_usuario");
        }

        resolve();

      }
    });

    return promesa;

  }

}
