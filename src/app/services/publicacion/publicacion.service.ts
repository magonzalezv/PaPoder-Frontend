import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Publicacion } from '../../models/publicacion.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  totalPublicaciones: number = 0;

  usuario: string;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _subirArchivo: SubirArchivoService
  ) { }

  // Carga todas las publicaciones
  cargarPublicaciones() {
    let url = URL_SERVICIOS + '/publicacion';
    return this.http.get( url )
        .pipe(map ( (resp: any) => {
          this.totalPublicaciones = resp.total;
          return resp.publicaciones;
        }));
  }

  // Obtiene una publicación buscada por ID
  obtenerPublicacion( id: string ) {
    let url = URL_SERVICIOS + '/publicacion/' + id;
    return this.http.get( url )
      .pipe ( map ( (resp: any) => {
       return  resp.publicacion;
       this.usuario = resp.publicacion.usuario.nombre;
      }  ) );
  }

  // Borra una publicación por ID
  borrarPublicacion( id: string ) {
    let url = URL_SERVICIOS + '/publicacion/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
      .pipe ( map ( resp => swal( 'Publicación borrada', 'Eliminada correctamente', 'success' ) ) );
  }

  // Crea una nueva publicación
  crearPublicacion( publicacion: Publicacion ) {
    let url = URL_SERVICIOS + '/publicacion';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, publicacion )
      .pipe( map ( (resp: any) => {
        swal( 'Publicación creada', 'Creada correctamente', 'success' );
        return resp.publicacion;
      }));
  }

  // Busca una publicación por parametros
  buscarPublicacion ( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/publicaciones/' + termino;
    return this.http.get( url )
      .pipe(map ( (resp: any) => resp.publicaciones ));
  }

  // Actualiza los datos de una publicación
  actualizarPublicacion ( publicacion: Publicacion ) {
    let url = URL_SERVICIOS + '/publicacion/' + publicacion._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, publicacion )
        .pipe( map ( (resp: any)  => {
          //swal( 'Publicación actualizada', 'Actualizada correctamente', 'success' );
          return resp.publicacion;
        } ));
  }

  // Subir imagen de la publicación
  cambiarImagen ( archivo: File, id: string ) {
    this._subirArchivo.subirArchivo( archivo, 'publicaciones', id )
      .then ((resp: any ) => {
        console.log(resp.publicacion.img);
      })
      .catch( resp => {
        console.log( resp );
      });
  }

  // Me gusta una publicación
  meGustaPublicacion ( publicacion: Publicacion ) {
    let url = URL_SERVICIOS + '/publicacion/' + publicacion._id + '/meGusta';
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, publicacion )
        .pipe( map ( (resp: any)  => {
          return resp.publicacion;
        } ));
  }

   // Me divierte una publicación
   meDiviertePublicacion ( publicacion: Publicacion ) {
    let url = URL_SERVICIOS + '/publicacion/' + publicacion._id + '/meDivierte';
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, publicacion )
        .pipe( map ( (resp: any)  => {
          return resp.publicacion;
        } ));
  }

    // Me sorprende una publicación
    meSorprendePublicacion ( publicacion: Publicacion ) {
      let url = URL_SERVICIOS + '/publicacion/' + publicacion._id + '/meSorprende';
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, publicacion )
          .pipe( map ( (resp: any)  => {
            return resp.publicacion;
          } ));
    }

     // Me entristece una publicación
     meEntristecePublicacion ( publicacion: Publicacion ) {
      let url = URL_SERVICIOS + '/publicacion/' + publicacion._id + '/meEntristece';
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, publicacion )
          .pipe( map ( (resp: any)  => {
            return resp.publicacion;
          } ));
    }

     // Me enoja una publicación
     meEnojaPublicacion ( publicacion: Publicacion ) {
      let url = URL_SERVICIOS + '/publicacion/' + publicacion._id + '/meEnoja';
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, publicacion )
          .pipe( map ( (resp: any)  => {
            return resp.publicacion;
          } ));
    }

}
