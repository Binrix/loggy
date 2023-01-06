import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'extractTime'})
export class ExtractTimePipe implements PipeTransform {
  transform(value: string): string {
    return value.split("-")[1];
  }
}