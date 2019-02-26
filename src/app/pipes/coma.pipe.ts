import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coma'
})
export class ComaPipe implements PipeTransform {

  transform(text: string): any {
    const text2 = text.replace(',', ' ');
    return text2;
  }

}
