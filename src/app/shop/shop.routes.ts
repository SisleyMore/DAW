import type { Routes } from "@angular/router";
import {LoginComponent} from "./components/auth/login/login.component";
import {ShopLayoutComponent} from "./components/layout/shop-layout/shop-layout.component";
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {ProductDetailComponent} from "./pages/product-detail/product-detail.component";
import {ProductListComponent} from "./pages/product-list/product-list.component";
import { MackeupComponent } from "./components/services/mackeup/mackeup.component";
import { ProductsComponent } from "./components/products/products.component";
import { AppointmentsComponent } from "./components/appointments/appointments.component";

export const SHOP_ROUTES: Routes = [
 
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'appointments',
    component: AppointmentsComponent
  },
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
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent
      },
      {
        path: 'mackeup',
        component: MackeupComponent
      },
      {
        path: 'add-product',
        component: ProductsComponent
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
