import { CurrencyPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { SHOP_ROUTES } from '../../shop.routes';
import {
  Component,
  DestroyRef,
  type Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { concatAll, concatMap, from, mergeMap, of, switchAll } from 'rxjs';
import { Product } from '../../../models/product.interface';
import { Producto } from '../../../models/productClass';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ButtonModule,
    CurrencyPipe,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    RadioButtonModule,
    InputNumberModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    NgClass,
    NgIf,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  readonly messageService = inject(MessageService);
  readonly confirmationService = inject(ConfirmationService);
  readonly productsService = inject(ProductService);
  productDialog: WritableSignal<boolean> = signal(false);
  productToEdit!: Product;
  selectedProducts!: Product[] | null;
  items: MenuItem[] | undefined;
  productos!: Product[];
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/admin',
      },
      {
        label: 'Citas',
        icon: 'pi pi-envelope',
        badge: '3',
        routerLink: '/app/appointments'
      },
    ];

    this.productsService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => {
        this.productos = products;
      });
  }

  mensaje = 'Modo inserción';
  insUpd = true; // TRUE - INSERTAR -- FALSE - ACTUALIZAR
  model = new Producto();

  public openNew(): void {
    this.productToEdit = {} as Product;
    this.productDialog.set(true);
  }

  // getProducto(i: Product) {
  //   this.productsService.getProducto(i.codPro).subscribe((resp: any) => {
  //     this.mensaje = 'Modo actualización';
  //     this.model = resp;
  //     this.insUpd = false;
  //   });
  // }

  editProduct(product: Product): void {
    this.productToEdit = { ...product };
    this.productDialog.set(true);
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: `¿Está segurod de eliminar ${product.nombre}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.delProductoById(product.codPro).subscribe({
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto eliminado',
              life: 3000,
            });
            this.productsService
              .getProducts()
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe((products) => {
                this.productos = products;
              });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.message,
              life: 3000,
            });
          },
        });
      },
    });
  }

  deleteSelectedProducts() {
    console.log('Productos seleccionados: ', this.selectedProducts);
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar los productos seleccionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        from(this.selectedProducts?.map((product) => product.codPro) ?? [])
          .pipe(
            mergeMap((codPro) => this.productsService.delProductoById(codPro)),
          )
          .subscribe({
            complete: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Products Deleted',
                life: 3000,
              });
            },
          });
        this.productsService
          .getProducts()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((products) => {
            this.productos = products;
          });
      },
    });
  }

  addProduct(product: Product) {
    console.log('Producto****: ', product);
    if (this.productToEdit.codPro) {
      this.productsService.updateProducto(product).subscribe({
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto actualizado',
            life: 3000,
          });
          this.productsService
            .getProducts()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((products) => {
              this.productos = products;
            });
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.productsService.insertProducto(product).subscribe({
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto creado',
            life: 3000,
          });
          this.productsService
            .getProducts()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((products) => {
              this.productos = products;
            });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  // delProducto(i: Product) {
  //   this.servicio.delProductoById(i.codPro).subscribe(() => {
  //     this.mensaje = 'Producto eliminado';
  //     this.getListado();
  //   });
  // }
  //
  // agregar = () => {
  //   if (this.insUpd) {
  //     this.servicio.insertProducto(this.model).subscribe((resp) => {
  //       this.mensaje = 'Agregado';
  //       this.getListado();
  //       this.insUpd = false;
  //     });
  //   } else {
  //     this.servicio.updateProducto(this.model).subscribe(() => {
  //       this.mensaje = `Producto ${this.model.nombre} actualizado`;
  //       this.getListado();
  //       this.insUpd = true;
  //     });
  //   }
  // };
}
