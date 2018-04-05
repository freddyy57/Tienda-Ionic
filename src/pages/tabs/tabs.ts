import { Component } from '@angular/core';
import { HomePage } from "../home/home";
import { CategoriasPage, OrdenesPage, BusquedaPage } from "../index.paginas";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1 = HomePage;
  tab2 = CategoriasPage;
  tab3 = OrdenesPage;
  tab4 = BusquedaPage;

}
