import { Component, OnInit, OnDestroy } from "@angular/core";
import { HeaderService } from "src/app/header/header.service";
import { Registro } from "src/app/shared/models/Registro";
import { RegistroService } from "src/app/shared/services/registro.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Mensagens } from "src/app/shared/mensagens.enum";

@Component({
  selector: "app-inserir-editar",
  templateUrl: "./inserir-editar.component.html",
  styleUrls: ["./inserir-editar.component.css"],
})
export class InserirEditarComponent implements OnInit, OnDestroy {
  registro: Registro = new Registro();

  constructor(
    private headerService: HeaderService,
    private service: RegistroService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.headerService.hideHeader();
    const registroId = Number(this.route.snapshot.paramMap.get("id"));
    this.buscarRegistro(registroId);
  }

  ngOnDestroy(): void {
    this.headerService.showHeader();
  }

  buscarRegistro(registroId: number) {
    if (registroId) {
      this.service
        .buscar(registroId)
        .subscribe((response) => (this.registro = response));
    }
  }

  labelButton() {
    return this.ehAlteracao() ? "Alterar" : "Cadastrar";
  }

  salvarAtualizar() {
    if (this.validarEntradas()) {
      if (this.ehAlteracao()) {
        this.atualizar();
      } else {
        this.salvar();
      }
    }
  }

  ehAlteracao() {
    return this.registro.inclusao && this.registro.id;
  }

  private validarEntradas(): boolean {
    if (this.registro.titulo || this.registro.descricao) {
      return true;
    } else {
      this.toaster.info(Mensagens.ERRO_AO_SALVAR_REGISTRO);
      return false;
    }
  }

  private salvar() {
    this.service
      .salvar(this.registro)
      .subscribe((response) => this.irParaHome());
  }

  private atualizar() {
    this.service
      .atualizar(this.registro)
      .subscribe((response) => this.irParaHome());
  }

  irParaHome() {
    this.router.navigate(["/home"]);
  }
}
