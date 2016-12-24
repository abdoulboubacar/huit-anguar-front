import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {

  transform(value: any, args?: any): any {
	    let res = [];
	    for (var i=0; i<value; i++){
		    res[i] = i;
	    }
		return res;
  }

}
