import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacion } from 'src/app/models/publicacion.model';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  publicacion: Publicacion;

  gusta = 'Me gusta';

  usuario: Usuario;

  constructor(
    public _publicacionService: PublicacionService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];

      this.cargarPublicacion(id);
    });
   }

  ngOnInit() {

  }

  cargarPublicacion( id: string ) {
    this._publicacionService.obtenerPublicacion( id )
          .subscribe( publicacion => this.publicacion = publicacion );

  }

  meGusta(publicacion: Publicacion) {
    this._publicacionService.meGustaPublicacion(publicacion)
      .subscribe( () => {
    this.cargarPublicacion(publicacion._id);
      console.log(this.publicacion);
      } );
  }

  meDivierte(publicacion: Publicacion) {
    this._publicacionService.meDiviertePublicacion(publicacion)
      .subscribe( () => {
        this.cargarPublicacion(publicacion._id);
        console.log(this.publicacion);
      } );
  }

  meSorprende(publicacion: Publicacion) {
    this._publicacionService.meSorprendePublicacion(publicacion)
      .subscribe( () => {
        this.cargarPublicacion(publicacion._id);
        console.log(this.publicacion);
      } );
  }

  meEntristece(publicacion: Publicacion) {
    this._publicacionService.meEntristecePublicacion(publicacion)
      .subscribe( () => {
        this.cargarPublicacion(publicacion._id);
        console.log(this.publicacion);
      } );
  }

  meEnoja(publicacion: Publicacion) {
    this._publicacionService.meEnojaPublicacion(publicacion)
      .subscribe( () => {
        this.cargarPublicacion(publicacion._id);
        console.log(this.publicacion);
      } );
  }




}

