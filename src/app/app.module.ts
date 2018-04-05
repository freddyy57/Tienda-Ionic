import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

// Pipes
import { ImagenPipe } from '../pipes/imagen/imagen';

// storage
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CarritoProvider, ProductosProvider, UsuarioProvider } from '../providers/index.services';
import {
   CarritoPage,
   CategoriasPage,
   LoginPage,
   OrdenesPage,
   OrdenesDetallePage,
   PorCategoriaPage,
   ProductoPage ,
   TabsPage,
   BusquedaPage
} from '../pages/index.paginas'


@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    HomePage,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriaPage,
    ProductoPage ,
    TabsPage,
    BusquedaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot( MyApp, {
      backButtonText: 'Atrás'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriaPage,
    ProductoPage ,
    TabsPage,
    BusquedaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoProvider,
    ProductosProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
