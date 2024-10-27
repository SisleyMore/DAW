export interface Product {
  codPro: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  categoriaProducto: Categoria;
}

export interface Categoria{
  idCategoria: number;
  nombreCategoria: string;
}