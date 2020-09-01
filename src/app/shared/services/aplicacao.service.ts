import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Aplicacao } from '../models/aplicacao';
import { ToastrService } from 'ngx-toastr';
import { Mensagens } from '../mensagens.enum';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AplicacaoService {

  private url = 'app';
  private aplicacao: Aplicacao = new Aplicacao();

  constructor(
    private http: HttpClient,
    private toaster: ToastrService
  ) { }

  buscar(): Observable<Aplicacao> {
    return this.http.get<Aplicacao>(this.url)
      .pipe(
        catchError(error => this.httpError(error, Mensagens.ERRO_AO_BUSCAR_APLICACAO))
      );
  }

  salvar(aplicacao: Aplicacao): Observable<Aplicacao> {
    return this.http.post<Aplicacao>(this.url, aplicacao)
      .pipe(
        catchError(error => this.httpError(error, Mensagens.ERRO_AO_SALVAR_APLICACAO))
      );
  }

  getAplicacao(): Aplicacao {
    if (!this.aplicacao) {
      this.buscar().subscribe(response => {
        this.aplicacao = response
        return this.aplicacao
      });
    } else {
      return this.aplicacao;
    }
  }

  private httpError(error: HttpErrorResponse, mensagem: string) {
    this.toaster.error(mensagem);
    return throwError(mensagem);
  }
}
