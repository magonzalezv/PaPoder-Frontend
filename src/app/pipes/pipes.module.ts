import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { ComaPipe } from './coma.pipe';

@NgModule({
  imports: [
  ],
  declarations: [
    ImagenPipe,
    ComaPipe
  ],
  exports: [
    ImagenPipe,
    ComaPipe
  ]
})
export class PipesModule { }
