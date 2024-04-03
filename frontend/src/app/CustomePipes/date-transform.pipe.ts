import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform',
})
export class DateTransformPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    const parts = value.split('   ');

   const year = this.padLeft(parts[0], 4, '20');
   const month = this.padLeft(parts[1], 2, '0');
   const day = this.padLeft(parts[2], 2, '0');

    return `${day}  ${month}  ${year}`;
  }
  private padLeft(value: string, width: number, paddingChar: string): string {
    return (value || '  ').padStart(width, paddingChar);
  }
}
