import {Routes} from "@angular/router";
import {ShopLayoutComponent} from "./components/layout/shop-layout/shop-layout.component";
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";

export const SHOP_ROUTES: Routes = [
  {
    path: '',
    component: ShopLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
