import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empsearch'
})
export class EmpsearchPipe implements PipeTransform {

  transform(employee : any , searchTerm : any): any[] {
    if(!employee || ! searchTerm){
      return employee
    }
    else{
      return employee.filter(e=> e.Employee_Name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1)
    }
  }

}
