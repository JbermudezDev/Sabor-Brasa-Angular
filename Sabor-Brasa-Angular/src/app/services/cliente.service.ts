import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/carrodecompras.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor( 
    private http: HttpClient
  ) { }

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8090/clientes/all');
  }

  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`http://localhost:8090/clientes/find/${id}`);
  }

  deleteById(id: number){
    console.log(id);
    this.http.delete(`http://localhost:8090/clientes/delete/${id}`).subscribe();
  }

  addCliente(cliente: Cliente){
    this.http.post<Cliente>('http://localhost:8090/clientes/add', cliente).subscribe();
  }


}
