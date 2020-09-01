import { Component, OnInit, OnDestroy } from "@angular/core";
import { AplicacaoService } from "../shared/services/aplicacao.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Mensagens } from "../shared/mensagens.enum";
import { HeaderService } from "../header/header.service";
import { Aplicacao } from "../shared/models/aplicacao";

@Component({
  selector: "app-cadastrar-aplicacao",
  templateUrl: "./cadastrar-aplicacao.component.html",
  styleUrls: ["./cadastrar-aplicacao.component.css"],
})
export class CadastrarAplicacaoComponent implements OnInit, OnDestroy {
  aplicacao: Aplicacao = new Aplicacao();

  constructor(
    public aplicacaoService: AplicacaoService,
    private headerService: HeaderService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarAplicacao();
    this.headerService.hideHeader();
  }

  ngOnDestroy(): void {
    this.headerService.showHeader();
  }

  buscarAplicacao() {
    this.aplicacaoService.buscar().subscribe((response) => {
      this.aplicacao = response;
    });
  }

  salvarAplicacao2() {
    
  }

  salvarAplicacao() {
    if (this.validarCadastro()) {
      this.aplicacaoService.salvar(this.aplicacao).subscribe((response) => {
        this.aplicacao = response;
        this.toaster.success(Mensagens.SALVO_COM_SUCESSO);
        this.irParaHome();
      });
    }
  }

  validarCadastro(): boolean {
    if (this.aplicacao && this.aplicacao.nome && this.aplicacao.primaryColor) {
      return true;
    } else {
      this.toaster.info(Mensagens.CAMPOS_APLICACAO_OBRIGATORIOS);
      return false;
    }
  }

  irParaHome() {
    this.router.navigate(["/home"]);
  }
}
