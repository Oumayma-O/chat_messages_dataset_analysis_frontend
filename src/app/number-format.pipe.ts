import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: any): string {
    if (!isNaN(value)) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    return value; // If it's not a number, return the value as-is
  }

}
