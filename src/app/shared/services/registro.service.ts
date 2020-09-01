import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registro } from '../models/Registro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private url = 'registros';

  constructor(
    private http: HttpClient,
  ) { }

  buscar(id: number): Observable<Registro> {
    return this.http.get<Registro>(`${this.url}/${id}`);
  }

  listarTodos(): Observable<Registro[]> {
    return this.http.get<Registro[]>(this.url);
  }

  salvar(registro: Registro): Observable<Registro> {
    return this.http.post<Registro>(this.url, registro);
  }

  atualizar(registro: Registro): Observable<Registro> {
    return this.http.put<Registro>(this.url, registro);
  }

  deletar(registro: Registro): Observable<Registro> {
    return this.http.delete<Registro>(`${this.url}/${registro.id}`);
  }

}
