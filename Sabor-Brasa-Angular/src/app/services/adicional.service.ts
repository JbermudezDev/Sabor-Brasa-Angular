import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adicional } from '../models/adicional.model';

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {
   private baseUrl = 'http://localhost:8090/adicionales';
  
    constructor(private http: HttpClient) {}
  
    getAdicionales(): Observable<Adicional[]> {
      return this.http.get<Adicional[]>('http://localhost:8090/adicionales/all');
    }
  
    getAdicionalById(id: number): Observable<Adicional> {
      return this.http.get<Adicional>(`http://localhost:8090/adicionales/find/${id}`);
    }
  
    createAdicional(adicional: Adicional): Observable<Adicional> {
      return this.http.post<Adicional>(`http://localhost:8090/adicionales/add`, adicional);
    }
  
    updateAdicional(id: number, adicional: Adicional): Observable<void> {
      return this.http.put<void>(`http://localhost:8090/adicionales/update/${id}`, adicional);
    }
  
    deleteAdicional(id: number): Observable<any> {
      return this.http.delete(`http://localhost:8090/adicionales/delete/${id}`, { responseType: 'text' });
    }
    
}