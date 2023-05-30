import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CorretorLoginComponent } from './components/corretor/corretor-login/corretor-login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CorretorPageComponent } from './pages/corretor-page/corretor-page.component';
import { ImoveisPageComponent } from './pages/imoveis-page/imoveis-page.component';
import { CadastroImovelPageComponent } from './pages/cadastro-imovel-page/cadastro-imovel-page.component';
import { CardimoveisComponent } from './components/cardimoveis/cardimoveis.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarImovelComponent } from './pages/editar-imovel/editar-imovel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CorretorLoginComponent,
    HomePageComponent,
    CorretorPageComponent,
    ImoveisPageComponent,

    CadastroImovelPageComponent,
    CardimoveisComponent,
    EditarImovelComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
