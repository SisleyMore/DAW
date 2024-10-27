
export interface IProducto {
    codPro: number,
    nombre: string,
    descripcion: string,
    cantidad: string,
    precio: number,
    imagen: string,
    categoria: string
}

export interface ICategoria{
    idCategoria: number;
    nombreCategoria: string;
}