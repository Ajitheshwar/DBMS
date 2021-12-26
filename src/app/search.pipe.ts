import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(suppliers :  any[],searchTerm : string): any[] {

    if(!suppliers || !searchTerm){
      return suppliers
    }
    else{
      return suppliers.filter(s=> s.SName.toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1 )
      
    }
  }
}
