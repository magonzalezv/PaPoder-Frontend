import { Component, OnInit } from '@angular/core';
import { PublicacionService } from 'src/app/services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Publicacion } from '../../models/publicacion.model';
import { CrearPublicacionService } from '../../components/crear-publicacion/crear-publicacion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  
  ]
})
export class DashboardComponent implements OnInit {

  publicaciones: Publicacion[] = [];

  constructor(
    public _publicacionService: PublicacionService,
    public _usuarioService: UsuarioService,
    public _modalCrearPublicacion: CrearPublicacionService
  ) { }

  ngOnInit() {
   this.cargarPublicaciones();
   this._modalCrearPublicacion.notificacion
    .subscribe( resp => {
        this.cargarPublicaciones();
    });
  }

  cambiarComas( publicaciones: Publicacion[] ) {
    for (let index = 0; index < publicaciones.length; index++) {
      const categoria = publicaciones[index].categoria.replace(',', ' ');
      this.publicaciones[index].categoria = categoria;
      console.log('listo');
    }
  }

  // Cargar todas las publicaciones
  cargarPublicaciones() {
    this._publicacionService.cargarPublicaciones()
      .subscribe( publicaciones => {
        this.publicaciones = publicaciones;
        console.log(publicaciones);
      } );
  }

  // Buscar una publicación
  buscarPublicacion( termino: string ) {

    if (termino.length <= 0) {
        return this.cargarPublicaciones();
    }

    this._publicacionService.buscarPublicacion( termino )
      .subscribe( publicaciones => this.publicaciones = publicaciones );
  }

  actualizarVisitas( publicacion: any ) {
    for (let index = 0; index < this.publicaciones.length; index++) {
      if( this.publicaciones[index] === publicacion) {
          console.log('Entontrada');
          this.publicaciones[index].visitas += 1;
          console.log(this.publicaciones[index].visitas);
          this._publicacionService.actualizarPublicacion( this.publicaciones[index] )
              .subscribe (publicacion);
      }
    }
    console.log('Visita actualizada');
  }

 

}
