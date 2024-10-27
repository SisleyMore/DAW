export class Producto {
    codPro: number = 0;
    nombre: string = "";
    descripcion: string = "";
    stock: number = 0;
    precio: number = 0;
    imagen: string = "";
    categoriaProducto: ClassCategoria = new ClassCategoria();
}

export class ClassCategoria{
    idCategoria: number = 0;
    nombreCategoria: string = "";
}
