import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion;
  id: string;

  constructor( private route: ActivatedRoute,
                private _sProducto: ProductosService ) { }

  ngOnInit(): void {

    //OBTENER EL IDENTIFICADOR DEL PRODUCTO
    this.route.params
      .subscribe( parametros => {
        //INYECTAR EL IDENTIFICADOR DEL PRODUCTO
        this._sProducto.getProducto(parametros['id'])
        .subscribe( ( producto: ProductoDescripcion ) => {
          this.id = parametros['id'];
          this.producto = producto;
        });
      });

  }

}
