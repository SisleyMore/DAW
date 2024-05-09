import { Routes } from '@angular/router';

// export const routes: Routes = [
//     {path:"", component: HomeComponent},
//     {path:"quienes-somos", component: AboutComponent}
// ];

export const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./shop/shop.routes').then(m => m.SHOP_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'app'
  }
];
