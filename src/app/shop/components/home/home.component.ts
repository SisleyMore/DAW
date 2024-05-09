import { Component } from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {DividerModule} from "primeng/divider";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    DividerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // array of repeated numbers:
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  protected readonly carouselImages=  [
    {
      itemImageSrc: './assets/images/banner1.png',
      alt: 'Blusas de estilo floreado y colores vivos',
    },
    {
      itemImageSrc: './assets/images/banner2.jpg',
      alt: 'Maquillaje y accesorios',
    },
    {
      itemImageSrc: './assets/images/banner3.png',
      alt: 'Maquillaje',
    },
  ]
}
