import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrearPublicacionService {


  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal crear publicación listo');
   }

   ocultarModal() {
    this.oculto = 'oculto';
   }

   mostrarModal(  ) {
    this.oculto = '';
   }
}
