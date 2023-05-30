using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Imobiliaria.Models
{
    public class ImovelModel
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
    }
}
