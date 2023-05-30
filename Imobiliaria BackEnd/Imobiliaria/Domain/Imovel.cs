using Imobiliaria.Models;
using System;

namespace Imobiliaria.Domain
{
    public class Imovel : BaseModel
    {
        public int IdImovel { get; set; }
        public string NomeImovel { get; set; }
        public string MetrosQuadrados { get; set; }
        public int NQuarto { get; set; }
        public int Vaga { get; set; }
        public int NBanheiro { get; set; }
        public int ValorLocacao { get; set; }
        public bool Locado { get; set; }

        public string Estado { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Logradouro { get; set; }
        public string Numero { get; set; }
        public string Complemento { get; set; }
        public string Referencia { get; set; }

        public Usuario Pessoa { get; set; }
        public int IdPessoa { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }

        public bool AlterarValor { get; set; }

        public Imovel() { }

        public Imovel(string nomeImovel, string metrosQuadrados, int nQuarto, int vaga, int nBanheiro, int valorLocacao, bool locado, string estado, string cidade, string bairro, string logradouro, string numero, string complemento, string referencia, string usuarioInclusao)
        {
            this.NomeImovel = nomeImovel;
            this.MetrosQuadrados = metrosQuadrados;
            this.NQuarto = nQuarto;
            this.Vaga = vaga;
            this.NBanheiro = nBanheiro;
            this.ValorLocacao = valorLocacao;
            this.Estado = estado;
            this.Cidade = cidade;
            this.Bairro = bairro;
            this.Logradouro = logradouro;
            this.Numero = numero;
            this.Complemento = complemento;
            this.Referencia = referencia;
            this.Locado = locado;
            SetUsuarioInclusao(usuarioInclusao);
            Valida();
        }

        public void Alterar(string nomeImovel, string metrosQuadrados, int nQuarto, int vaga, int nBanheiro, int valorLocacao, bool locado, string estado, string cidade, string bairro, string logradouro, string numero, string complemento, string referencia, string usuarioAlteracao)
        {
            this.NomeImovel = nomeImovel;
            this.MetrosQuadrados = metrosQuadrados;
            this.NQuarto = nQuarto;
            this.Vaga = vaga;
            this.NBanheiro = nBanheiro;
            this.ValorLocacao = valorLocacao;
            this.Locado = locado;
            this.Estado = estado;
            this.Cidade = cidade;
            this.Bairro = bairro;
            this.Logradouro = logradouro;
            this.Numero = numero;
            this.Complemento = complemento;
            this.Referencia = referencia;
            SetUsuarioAlteracao(usuarioAlteracao);
            Valida();
        }

        public void AlterarValorImovel(bool alterarValor, string usuarioAlteracao)
        {
            this.AlterarValor = alterarValor;
            SetUsuarioAlteracao(usuarioAlteracao);
        }

        public void Valida()
        {
            if (string.IsNullOrEmpty(this.NomeImovel))
                throw new Exception("Campo nome é obrigatório ");

            if (this.Pessoa == null)
                throw new Exception("... é obrigatório ");
        }

        public void Excluir(string usuarioExclusao)
        {
            SetUsuarioExclusao(usuarioExclusao);
            Valida();
        }
    }
}