import { Injectable } from '@angular/core';
import { Aplicacao } from '../shared/models/aplicacao';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  show: boolean = true;
  aplicacao: Aplicacao;

  constructor() { }

  showHeader() {
    this.show = true;
  }

  hideHeader() {
    this.show = false;
  }
}
