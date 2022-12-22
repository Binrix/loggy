import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'statusToColor'})
export class StatusToColorPipe implements PipeTransform {
  transform(value: string): string {
    let valueToLowerCase = value.toLocaleLowerCase();
    if(valueToLowerCase.includes("warning")) {
        return "yellow";
    } else if(valueToLowerCase.includes("error")) {
        return "red";
    } else {
        return "default";
    }
  }
}