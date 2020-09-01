import { Component, OnInit } from "@angular/core";
import { Registro } from "../shared/models/registro";
import { RegistroService } from "../shared/services/registro.service";

@Component({
  selector: "app-registros",
  templateUrl: "./registros.component.html",
  styleUrls: ["./registros.component.css"],
})
export class RegistrosComponent implements OnInit {
  registros: Registro[] = [];

  constructor(private service: RegistroService) {}

  ngOnInit(): void {
    this.listarRegistros();
  }

  listarRegistros() {
    this.service
      .listarTodos()
      .subscribe((response) => (this.registros = response));
  }

  deletar(registro: Registro) {
    if (registro && registro.id) {
      this.service
        .deletar(registro)
        .subscribe((response) => this.listarRegistros());
    }
  }
}
