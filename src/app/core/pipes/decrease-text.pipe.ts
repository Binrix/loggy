import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'decreaseText'})
export class DecreaseTextPipe implements PipeTransform {
    transform(value: string, maxLength: number) {
        let shortend = value;
        if(value.length >= maxLength) {
            shortend = value.substring(0, maxLength);
        }

        return shortend.replace(/^(Log)/,"");
    }
}