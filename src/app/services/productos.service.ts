import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { timingSafeEqual } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  cargando = true;
  productoFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) { 

    this.cargarProductos();

  }

  private cargarProductos() {
    //LEER ARCHIVO FIREBASE .JSON EXTRACTO PRODUCTOS
    return new Promise(( resolve, reject ) => {
      this.http.get('https://aprendiendo-angular-49675.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[]) => {

        this.productos = resp;
        this.cargando = false;
        resolve();

      });
    });    
  }

  getProducto( id: string ){
    return this.http.get(`https://aprendiendo-angular-49675.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string){

    if (this.productos.length === 0) {
      //CARGAR PRODUCTOS
      this.cargarProductos().then( () => {
      //APLICAR FILTRO
      this.filtrarProducto( termino );
      });
    } else {
      //APLICAR FILTRO
      this.filtrarProducto( termino );
    }
  }

  private filtrarProducto( termino: string){
    //console.log( this.productos );
    
    this.productoFiltrado = [];
    termino = termino.toLocaleLowerCase();
    
    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){
        this.productoFiltrado.push( prod );
      }
    });
  }
}
