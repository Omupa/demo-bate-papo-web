import { Component, OnInit } from "@angular/core";
import { Aplicacao } from "../shared/models/aplicacao";
import { AplicacaoService } from "../shared/services/aplicacao.service";
import { HeaderService } from "./header.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  aplicacao: Aplicacao = new Aplicacao();

  constructor(
    public headerService: HeaderService,
    private service: AplicacaoService,
  ) {}

  ngOnInit(): void {
    this.buscarAplicacao();
  }

  buscarAplicacao() {
    this.service.buscar().subscribe((response) => {
      this.aplicacao = response;
    });
  }
}
