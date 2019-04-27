import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  pure: false // Listening changes in the array
})
export class KeysPipe implements PipeTransform {
  transform(value: any): any {
    let keys = [];
    for(let key in value) {
      keys.push(key);
    }
    return keys;
  }
}
