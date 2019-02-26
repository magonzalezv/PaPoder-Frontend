import { Component, OnInit } from '@angular/core';
import { CrearPublicacionService } from './crear-publicacion.service';
import { PublicacionService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Publicacion } from '../../models/publicacion.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styles: []
})
export class CrearPublicacionComponent implements OnInit {

  forma: FormGroup;

  imagenSubir: File;

  imagenTemp: string;

  noImage: string = 'null';

  nombreImagen: string = 'null';


  categoria: string = '';

  categoria1: boolean;
  categoria2: boolean;
  categoria3: boolean;
  categoria4: boolean;


  constructor(
    public router: Router,
    public _publicacionService: PublicacionService,
    public _modalCrearPublicacion: CrearPublicacionService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl (null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      categoria: new FormControl(null, Validators.required),
    });
  }

  crearPublicacion(  ) {
    console.log(this.categoria);

    if ( this.categoria1 === true ) {
      this.categoria += ', Movilidad';
    }

    if ( this.categoria2 === true ) {
      this.categoria += ', Cultura';
    }

    if ( this.categoria3 === true ) {
      this.categoria += ', Espacio público';
    }

    if ( this.categoria4 === true ) {
      this.categoria += ', Educación';
    }
    console.log(this.categoria);
    const html = this.forma.value.descripcion;
    const div = document.createElement('div');
    div.innerHTML = html;
    var extracto = div.textContent || div.innerText || '';
    extracto = extracto.substring(0, 200);
    extracto = extracto + '...';

    if (this.imagenSubir !== undefined) {
      this.nombreImagen = this.imagenSubir.name;
    }

    const publicacion = new Publicacion(
      this.forma.value.nombre,
      this.forma.value.descripcion,
      extracto,
      this.categoria,
      '',
      this.nombreImagen,
      '',
      0,
      this._usuarioService.usuario._id,
    );

    this._publicacionService.crearPublicacion( publicacion )
      .subscribe( () => {
    this._publicacionService.cambiarImagen(this.imagenSubir, this._usuarioService.usuario._id);
    location.reload();
      } );

  }

  seleccionImagen ( archivo ) {
    if ( !archivo ) {
      this.imagenSubir =  null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0) {
      swal ('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    console.log( archivo );

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = (  ) =>  this.imagenTemp =  reader.result.toString();
    

    this.imagenSubir = archivo;

  }

}
