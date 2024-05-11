import type { Routes } from "@angular/router";
import {ShopLayoutComponent} from "./components/layout/shop-layout/shop-layout.component";
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {ProductDetailComponent} from "./pages/product-detail/product-detail.component";
import {ProductListComponent} from "./pages/product-list/product-list.component";
import { ManicureComponent } from "./components/services/manicure/manicure.component";
import { FormServiceComponent } from "./components/services/form-service/form-service.component";
import { MackeupComponent } from "./components/services/mackeup/mackeup.component";
import { ProductsComponent } from "./components/products/products.component";

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
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent
      },
      {
        path: 'manicure',
        component: ManicureComponent
      },
      {
        path: 'mackeup',
        component: MackeupComponent
      },
      {
        path: 'form-service',
        component: FormServiceComponent
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
