using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Imobiliaria.Models
{
    public class FiltroUsuarioModel
    {
        public string Login { get; set; }
        public string Nome { get; set; }
        public string TipoUsuario { get; set; }
        public int? IdImovel { get; set; }
        public string Situacao { get; set; }

        public FiltroUsuarioModel()
        {
            this.Login = "";
            this.TipoUsuario = "";
            this.Situacao = "";
        }

    }
}
