import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly urlApi:string = 'http://localhost:3000/employess'


  constructor(private _http:HttpClient){}


  addEmplye(data:any):Observable<any>{
    return this._http.post(this.urlApi,data)
  }

  getEmplye():Observable<any>{
    return this._http.get(this.urlApi)
  }
  
  updateEmploye(id:number,data:any){
    return this._http.put(this.urlApi+'/'+id,data)
  }

  deleteEmplye(id:number):Observable<any>{
    return this._http.delete(this.urlApi+'/'+id)
  }
}
