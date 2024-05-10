import {Routes} from "@angular/router";
import {ShopLayoutComponent} from "./components/layout/shop-layout/shop-layout.component";
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {ProductDetailComponent} from "./pages/product-detail/product-detail.component";
import {ProductListComponent} from "./pages/product-list/product-list.component";

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
