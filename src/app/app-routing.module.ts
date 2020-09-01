import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastrarAplicacaoComponent } from './cadastrar-aplicacao/cadastrar-aplicacao.component';
import { InserirEditarComponent } from './registros/inserir-editar/inserir-editar.component';


const routes: Routes = [
  { path: '**', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'cadastrar-aplicacao', component: CadastrarAplicacaoComponent },
  { path: 'inserir-editar', component: InserirEditarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
