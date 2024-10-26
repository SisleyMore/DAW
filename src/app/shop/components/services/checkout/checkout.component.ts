import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import { VentaService } from '../../../../service/venta.service';
import { ShoppingCartStore } from '../../../+store/shopping-cart.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HttpClientModule], 
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  private readonly cartStore = inject(ShoppingCartStore); 
  private readonly router = inject(Router); 

  constructor(private ventaService: VentaService) {}

  procesarPago(event: Event) {
    event.preventDefault(); 

   
    const venta = {
      usuario: { idUsuario: 1 }, 
      montoTotal: this.cartStore.total(),  
      fechaRegistro: new Date(),
      detalleVentas: this.cartStore.cartItems().map(item => ({
        idProducto: item.product.codPro,
        cantidad: item.quantity,
        precio: item.product.precio
      })),
    };

    this.ventaService.registrarVenta(venta).subscribe({
      next: (data) => {
        console.log('Venta registrada:', data);
        alert('Compra completada exitosamente');
        
       
        this.clearCart(); 

        this.router.navigate(['/home']); 
      },
      error: (error) => {
        console.error('Error al registrar la venta:', error);
      }
    });
  }

  clearCart() {
    const items = this.cartStore.cartItems();
    items.forEach(item => {
      this.cartStore.removeFromCart(item); 
    });
  }
}
