import { Injectable, EventEmitter } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ThemeSettingsService } from "../vendor/libs/theme-settings/theme-settings.service";
import { ToastrService } from "ngx-toastr";
import { NgbModalOptions, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl } from "@angular/forms";
import Swal from "sweetalert2";
import { Observable } from "rxjs";

@Injectable()
export class AppService {
  confirmarDelete = new EventEmitter<boolean>();
  constructor(
    private titleService: Title,
    private themeSettingsService: ThemeSettingsService,
    public toastrService: ToastrService
  ) { }

  // set options datatable

  getlanguageDatatable() {
    const dtOption = {
      language: {
        sEmptyTable: "Nenhum registro encontrado",
        sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        sInfoEmpty: "Mostrando 0 até 0 de 0 registros",
        sInfoFiltered: "(Filtrados de _MAX_ registros)",
        sInfoPostFix: "",
        sInfoThousands: ".",
        sLengthMenu: "_MENU_ resultados por página",
        sLoadingRecords: "Carregando...",
        sProcessing: "Processando...",
        sZeroRecords: "Nenhum registro encontrado",
        sSearch: "Pesquisar",
        oPaginate: {
          sNext: "Próximo",
          sPrevious: "Anterior",
          sFirst: "Primeiro",
          sLast: "Último",
        },
        oAria: {
          sSortAscending: ": Ordenar colunas de forma ascendente",
          sSortDescending: ": Ordenar colunas de forma descendente",
        },
      },
    };

    return dtOption;
  }

  calcularIMC(altura, peso) {
    if (altura && peso) {
      const pesoC = parseFloat(peso);
      const alturaC = parseFloat(altura);
      const imc = pesoC / (alturaC * alturaC);
      return imc.toFixed(2);
    }
  }

  apenasNumeros(n: string) {
    var numsStr = n.replace(/[^0-9]/g, '');
    return parseInt(numsStr);
  }

  calcularIdade(data) {
    const d = new Date(),
      ano_atual = d.getFullYear(),
      mes_atual = d.getMonth() + 1,
      dia_atual = d.getDate(),
      split = data.split("/"),
      novadata = split[1] + "/" + split[0] + "/" + split[2],
      data_americana = new Date(novadata),
      vAno = data_americana.getFullYear(),
      vMes = data_americana.getMonth() + 1,
      vDia = data_americana.getDate(),
      ano_aniversario = +vAno,
      mes_aniversario = +vMes,
      dia_aniversario = +vDia;
    let quantos_anos = 0;
    quantos_anos = ano_atual - ano_aniversario;
    if (
      mes_atual < mes_aniversario ||
      (mes_atual === mes_aniversario && dia_atual < dia_aniversario)
    ) {
      quantos_anos--;
    }
    return quantos_anos < 0 ? 0 : quantos_anos;
  }

  // Tratamento de error para retorno 500 (Internal server error ) é 400 (badRequest)
  trataErro(err: any) {
    if (err.status === 400) {
      this.toastrService.error(err.error);
      return err.error;
    } else if (err.status === 500) {
      this.toastrService.error(err.error.Message);
      return err.error.Message;
    }
  }

  // Set page title
  set pageTitle(value: string) {
    this.titleService.setTitle(`Proclin - ${value}`);
  }

  // Check for RTL layout
  get isRTL() {
    return (
      document.documentElement.getAttribute("dir") === "rtl" ||
      document.body.getAttribute("dir") === "rtl"
    );
  }

  // Check if IE10
  get isIE10() {
    return (
      typeof document["documentMode"] === "number" &&
      document["documentMode"] === 10
    );
  }

  dataHoje() {
    const now = new Date();

    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);

    const today = now.getFullYear() + "-" + month + "-" + day;
    return today;
  }
  
  dataQuinzeDiasAtras() {
    const diasAtras = 15;
    const now = new Date();
    const milissegundos_por_dia = 1000 * 60 * 60 * 24;
    const data_final = new Date(
      now.getTime() - diasAtras * milissegundos_por_dia
    );
    const day = ("0" + data_final.getDate()).slice(-2);
    const month = ("0" + (data_final.getMonth() + 1)).slice(-2);

    const quinzeDiasAtras = data_final.getFullYear() + "-" + month + "-" + day;
    return quinzeDiasAtras;
  }

  // Layout navbar color
  get layoutNavbarBg() {
    return this.themeSettingsService.getOption("navbarBg") || "navbar-theme";
  }

  // Layout sidenav color
  get layoutSidenavBg() {
    return this.themeSettingsService.getOption("sidenavBg") || "sidenav-theme";
  }

  // Layout footer color
  get layoutFooterBg() {
    return this.themeSettingsService.getOption("footerBg") || "footer-theme";
  }

  // -------------------------------------------------------------------------------------------------------------------------

  public isNullOrEmpty(val: string): boolean {
    if (val === undefined || val === null || val.trim() === "") {
      return true;
    }
    return false;
  }

  public isNullOrEmptyNumber(val: string): string {
    if (val === undefined || val === null || val.trim() === "" || val.trim() === "null") {
      return "0";
    }
    return val;
  }

  public verificarNumeroVazio(val: number) {
    if (val === undefined || val === null) {
      return 0;
    }
    return val;
  }
  public verificarStringVazia(val: string) {
    if (val === undefined || val === null || val.trim() === "") {
      return "";
    }
    return val;
  }

  public isNullOrEmpty2(val: string): boolean {
    if (val === undefined || val === null || val === "") {
      return true;
    }
    return false;
  }

  public isNullOrUndefined(val: any): boolean {
    if (val === undefined || val === null) {
      return true;
    }
    return false;
  }

  public isEmailValido(email: string) {
    if (email === "" || email === undefined || email === null) {
      return true;
    }

    const regex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

    if (regex.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  public isCelularValido(telefone: string) {
    if (telefone === "") {
      return true;
    }
    if (telefone === undefined) {
      return true;
    }

    telefone = telefone.replace(/\D/g, "");

    if (telefone.length < 11) {
      return false;
    }

    if (
      telefone.length === 11 &&
      parseInt(telefone.substring(2, 3), 10) !== 9
    ) {
      return false;
    }

    for (let n = 0; n < 10; n++) {
      if (
        telefone === new Array(11).join(n.toString()) ||
        telefone === new Array(12).join(n.toString())
      ) {
        return false;
      }
    }
    const codigosDdd = [
      11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34,
      35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62,
      64, 63, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85,
      86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
    ];
    if (codigosDdd.indexOf(parseInt(telefone.substring(0, 2), 10)) === -1) {
      return false;
    }

    if (
      telefone.length === 10 &&
      [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3), 10)) === -1
    ) {
      return false;
    }

    return true;
  }

  public isTelefoneValido(telefone: string) {
    if (telefone === "") {
      return true;
    }
    if (telefone === undefined) {
      return true;
    }

    telefone = telefone.replace(/\D/g, "");

    if (!(telefone.length >= 10 && telefone.length <= 11)) {
      return false;
    }

    if (
      telefone.length === 11 &&
      parseInt(telefone.substring(2, 3), 10) !== 9
    ) {
      return false;
    }

    for (let n = 0; n < 10; n++) {
      if (
        telefone === new Array(11).join(n.toString()) ||
        telefone === new Array(12).join(n.toString())
      ) {
        return false;
      }
    }
    const codigosDdd = [
      11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34,
      35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62,
      64, 63, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85,
      86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
    ];
    if (codigosDdd.indexOf(parseInt(telefone.substring(0, 2), 10)) === -1) {
      return false;
    }

    if (
      telefone.length === 10 &&
      [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3), 10)) === -1
    ) {
      return false;
    }

    return true;
  }

  public isCpfValido(cpf: string) {
    if (!cpf) {
      return false;
    }

    const BLACKLIST = [
      "00000000000",
      "11111111111",
      "22222222222",
      "33333333333",
      "44444444444",
      "55555555555",
      "66666666666",
      "77777777777",
      "88888888888",
      "99999999999",
      "12345678909",
    ];

    let soma;
    let resto;
    soma = 0;
    if (cpf.trim() === "" || cpf === null || cpf === undefined) {
      return false;
    }
    cpf = (cpf || "").toString().replace(/[^\d]/g, "");
    if (BLACKLIST.includes(cpf)) {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i), null) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10), null)) {
      return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i), null) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11), null)) {
      return false;
    }

    return true;
  }

  // -------------------------------------------------------------------------------------------------------------------------
  // validações do formulário
  mostrarCSSErro(campo: string, form: FormGroup) {
    return {
      "is-invalid": this.campoValido(campo, form),
      "": this.campoValido(campo, form),
    };
  }

  mostrarCSSErroDinamico(campo: string, form: FormGroup, validar: boolean) {
    if (validar) {
      return {
        "is-invalid": this.campoValido(campo, form),
        "": this.campoValido(campo, form),
      };
    } else {
      return "";
    }
  }

  campoValido(campo: string, form: FormGroup) {
    return !form.get(campo).valid && form.get(campo).touched;
  }

  validarTodosCampos(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validarTodosCampos(control);
      }
    });
  }

  nomeMaeValidoANS(nmMae) {
    if (nmMae.length < 3) {
      this.SwalWarning(
        "Atenção",
        "O nome da mãe não deve conter menos de 3 letras!"
      );
      return false;
    }

    if (nmMae.indexOf(" ") == -1) {
      this.SwalWarning("Atenção", "O nome da mãe deve conter mais de um nome!");
      return false;
    }

    if (
      !(
        nmMae.charAt(nmMae.indexOf(" ") - 1) != " " &&
        nmMae.indexOf(" ") > 0 &&
        nmMae.charAt(nmMae.indexOf(" ") + 1) != " " &&
        nmMae.indexOf(" ") < nmMae.length - 1
      )
    ) {
      this.SwalWarning("Atenção", "O nome da mãe deve conter mais de um nome!");
      return false;
    }

    if (nmMae.indexOf(".") > -1) {
      this.SwalWarning(
        "Atenção",
        "O nome da mãe não deve conter nomes abreviados"
      );
      return false;
    }

    return true;
  }

  // -------------------------------------------------------------------------------------------------------------------------
  // modais
  get optionsModalLarge() {
    const optionsModalLarge: NgbModalOptions = {
      centered: false,
      size: "lg",
      backdrop: "static",
      keyboard: false,
      backdropClass: "modal-backdrop",
    };
    return optionsModalLarge;
  }

  get optionsModalMedium() {
    const optionsModalLarge: NgbModalOptions = {
      centered: false,
      backdrop: "static",
      keyboard: false,
      backdropClass: "modal-backdrop",
    };
    return optionsModalLarge;
  }

  get optionsModalVeryLarge() {
    const optionsModalVeryLarge: NgbModalOptions = {
      centered: false,
      backdrop: "static",
      keyboard: false,
      backdropClass: "modal-backdrop",
      windowClass: "veryLargeModal",
    };
    return optionsModalVeryLarge;
  }

  get optionsXLLarge() {
    const optionsModalLarge: NgbModalOptions = {
      centered: false,
      size: "lg",
      backdrop: "static",
      keyboard: false,
      backdropClass: "modal-backdrop-xl",
    };
    return optionsModalLarge;
  }

  get optionsModalSmal() {
    const optionsModalSmal: NgbModalOptions = {
      centered: false,
      size: "sm",
      backdrop: "static",
      keyboard: false,
      backdropClass: "modal-backdrop",
    };
    return optionsModalSmal;
  }

  get optionsModalSmalBack() {
    const optionsModalSmal: NgbModalOptions = {
      centered: false,
      size: "sm",
      backdrop: true,
      keyboard: false,
      backdropClass: "modal-backdrop",
      windowClass: "modal-login",
    };
    return optionsModalSmal;
  }

  // swal -------------------------------------------------------------------------------------------------------------------------
  SwalErrorConfirm(title: string = "Erro!", text: string = "Ocorreu um erro") {
    Swal({
      title: title,
      text: text,
      type: "error",
      confirmButtonText: "OK",
    });
  }

  SwalError(title: string = "Erro!", text: string = "Ocorreu um erro") {
    Swal({
      title: title,
      text: text,
      type: "error",
    });
  }

  SwalSuccessConfirm(
    title: string = "Sucesso!",
    text: string = "Atualizado com sucesso!"
  ) {
    Swal({
      title: title,
      text: text,
      type: "success",
      confirmButtonText: "OK",
    });
  }

  SwalSuccess(
    title: string = "Sucesso!",
    text: string = "Atualizado com sucesso"
  ) {
    Swal({
      title: title,
      text: text,
      type: "success",
    });
  }

  eventoDelete(confirmar: boolean) {
    this.confirmarDelete.emit(confirmar);
  }

  SwalWarningConfirmDelete() {
    let resposta = false;
    Swal({
      title: "Atenção!",
      text: "Tem certeza que deseja excluir?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Excluir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        resposta = result.value;
      }
      this.eventoDelete(resposta);
    });
  }

  SwalInfoConfirmSair(activeModal: NgbActiveModal) {
    Swal({
      title: "Deseja abandonar?",
      text: "Se você sair os dados alterados não serão salvos.",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sair",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        activeModal.close();
      }
    });
  }

  SwalInfoConfirm(title: string = "Atenção!", text: string = "Atenção!") {
    Swal({
      title: title,
      text: text,
      type: "info",
      confirmButtonText: "OK",
    });
  }

  SwalInfo(title: string = "Atenção!", text: string = "Atenção") {
    Swal({
      title: title,
      text: text,
      type: "info",
    });
  }

  SwalWarningConfirm(title: string = "Atenção!", text: string = "Atenção!") {
    Swal({
      title: title,
      text: text,
      type: "warning",
      confirmButtonText: "OK",
    });
  }

  SwalWarning(title: string = "Atenção!", text: string = "Atenção") {
    Swal({
      title: title,
      text: text,
      type: "warning",
    });
  }

  // -------------------------------------------------------------------------------------------------------------------------

  // Animate scrollTop
  scrollTop(
    to: number,
    duration: number,
    element = document.scrollingElement || document.documentElement
  ) {
    if (element.scrollTop === to) {
      return;
    }
    const start = element.scrollTop;
    const change = to - start;
    const startDate = +new Date();

    // t = current time; b = start value; c = change in value; d = duration
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) {
        return (c / 2) * t * t + b;
      }
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animateScroll = function () {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(
        easeInOutQuad(currentTime, start, change, duration),
        10
      );
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };

    animateScroll();
  }
}
