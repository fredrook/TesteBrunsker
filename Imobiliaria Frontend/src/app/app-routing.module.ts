import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CorretorPageComponent } from './pages/corretor/corretor-page.component';
import { CadastroImovelPageComponent } from './pages/cadastro-imovel/cadastro-imovel-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'Corretor',
    component: CorretorPageComponent,
  },
  {
    path: 'CasdastrarImovel',
    component: CadastroImovelPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
