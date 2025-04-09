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

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`http://localhost:8090/clientes/update/${id}`, cliente);
  }

 
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8090/clientes/delete/${id}`);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8090/clientes/add', cliente);
  }


}
