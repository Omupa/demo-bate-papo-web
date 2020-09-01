import { Component, OnInit } from "@angular/core";
import { AplicacaoService } from "./shared/services/aplicacao.service";
import { Aplicacao } from "./shared/models/aplicacao";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private aplicacaoService: AplicacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarAplicacao();
  }

  private buscarAplicacao() {
    this.aplicacaoService.buscar().subscribe(
      (response) => {
        this.verificarInicioDaAplicacao(response);
      },
      (error) => {
        this.irParaCadastrarAplicacao();
      }
    );
  }

  private verificarInicioDaAplicacao(aplicacao: Aplicacao) {
    if (!aplicacao || !aplicacao.nome || !aplicacao.descricao) {
      this.irParaCadastrarAplicacao();
    } else {
      this.irParaHome();
    }
  }

  private irParaCadastrarAplicacao() {
    this.router.navigate(["/cadastrar-aplicacao"]);
  }

  private irParaHome() {
    this.router.navigate(["/home"]);
  }
}
