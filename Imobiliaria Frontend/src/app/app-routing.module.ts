import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CorretorPageComponent } from './pages/corretor-page/corretor-page.component';
import { ImoveisPageComponent } from './pages/imoveis-page/imoveis-page.component';
import { CadastroImovelPageComponent } from './pages/cadastro-imovel-page/cadastro-imovel-page.component';
import { EditarImovelComponent } from './pages/editar-imovel/editar-imovel.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'corretor',
    component: CorretorPageComponent,
  },
  {
    path: 'imoveis',
    component: ImoveisPageComponent,
  },
  {
    path: 'casdastroimovel',
    component: CadastroImovelPageComponent,
  },
  {
    path: 'Editimovel',
    component: EditarImovelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
