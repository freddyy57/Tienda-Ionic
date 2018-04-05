// import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from '../../config/url.servicios';


@Injectable()
export class ProductosProvider {

  pagina:number = 0;
  productos:any[] = [];
  lineas:any[] = [];
  por_categorias:any[] = [];
  resultados:any[] = [];

  constructor(public http: Http ) {
    // console.log('Hello ProductosProvider Provider');
    this.cargar_todos();
    this.cargar_lineas();
  }

  cargar_por_categorias( categoria:number ) {

    let url = URL_SERVICIOS + "/productos/por_tipo/" + categoria;
    this.http.get( url )
             .map( res => res.json() )
             .subscribe( data => {
                 if( data.error ) {
                   // Problemas
                 } else {

                 console.log(data.productos);
                 this.por_categorias = data.productos;
                 //this.pagina += 1;
                // console.log(this.pagina);
               }
             });
  }

  cargar_lineas() {
    let url = URL_SERVICIOS + "/lineas";
    this.http.get( url )
             .map( res => res.json() )
             .subscribe( data => {
               if( data.error ) {
                 // Problemas
               } else {
               this.lineas = data.lineas;
               // console.log(this.lineas);
             }
             })
  }

  cargar_todos() {

    let promesa = new Promise( (resolve, reject) => {

      let url = URL_SERVICIOS + "/productos/todos/" + this.pagina;

      this.http.get( url )
               .map( resp => resp.json() )
               .subscribe( data => {
                 // console.log(data);
                 if ( data.error) {
                   //Aqui hay un problema
                 } else {
                 // agrupar arreglo  en pares
                 let nuevaData = this.agrupar( data.productos, 2);

                 // this.productos.push( ...data.productos );
                 this.productos.push( ...nuevaData );
                 this.pagina += 1;
               }

               resolve();

               })

    });

    return promesa;

  }

  private agrupar( arr:any, tamano:number ) {
    let nuevoArreglo = [];
    for( let i=0; i<arr.length; i+=tamano) {
      nuevoArreglo.push( arr.slice(i, i+tamano) );
    }
    // console.log( nuevoArreglo );
    return nuevoArreglo;
  }

  buscar_producto( termino:string ) {
    let url = URL_SERVICIOS + "/productos/buscar/" + termino;
    this.http.get( url )
           .subscribe( res => {
             let data = res.json();
             this.resultados = data.productos;
           })
  }

}
