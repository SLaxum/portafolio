import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  cargando = true;

  constructor( private http: HttpClient ) { 

    this.cargarProductos();

  }

  private cargarProductos() {
    //LEER ARCHIVO FIREBASE .JSON EXTRACTO PRODUCTOS
    this.http.get('https://aprendiendo-angular-49675.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[]) => {

        this.productos = resp;
        this.cargando = false;

      });
  }

  getProducto( id: string ){
    return this.http.get(`https://aprendiendo-angular-49675.firebaseio.com/productos/${ id }.json`);
  }
}
