import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Publicacion } from '../../models/publicacion.model';
import { PublicacionService } from '../../services/service.index';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html'
})
export class PublicacionesComponent implements OnInit {

  forma: FormGroup;

  texto: string;
  publicaciones: Publicacion[] = [];

  constructor(
    public _publicacionService: PublicacionService,
    public _usuarioService: UsuarioService
  ) {

  }

  ngOnInit() {
    this.cargarPublicaciones();

    this.forma = new FormGroup({
      nombre: new FormControl (null, Validators.required),
      descripcion: new FormControl(null, Validators.required)
    });
  }


  // Buscar una publicación
  buscarPublicacion( termino: string ) {

    if (termino.length <= 0) {
        return this.cargarPublicaciones();
    }

    this._publicacionService.buscarPublicacion( termino )
      .subscribe( publicaciones => this.publicaciones = publicaciones );
  }


  // Cargar todas las publicaciones
  cargarPublicaciones() {
    this._publicacionService.cargarPublicaciones()
      .subscribe( publicaciones => {
        this.publicaciones = publicaciones;
        console.log(publicaciones);
      } );
  }


  // Actualiza una publicación
  guardarPublicacion ( publicacion: Publicacion ) {
    this._publicacionService.actualizarPublicacion( publicacion )
      .subscribe( );
  }

  // Borra una publicación
  borrarPublicacion ( publicacion: Publicacion ) {
    console.log( publicacion._id );
      this._publicacionService.borrarPublicacion( publicacion._id )
        .subscribe ( () => this.cargarPublicaciones() );
  }

  // Crear publicación
 

  
}
