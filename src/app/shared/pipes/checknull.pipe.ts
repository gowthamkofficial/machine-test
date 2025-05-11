import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checknull',
})
export class ChecknullPipe implements PipeTransform {
  transform(value: any, str?: string): unknown {
    return checkNull(value) ? value : checkNull(str) ? str : '';
  }
}
function checkNull(value: any) {
  return value != null && value != undefined && value != ""
}

