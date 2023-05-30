using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Imobiliaria.Models.SecurityToken
{
    public class TokenReturnModel
    {
        public User User { get; set; }
        public string Token { get; set; }
        public string TipoUsuario { get; set; }
        public int? IdImovel { get; set; }
    }

    public class TokenBeneficiarioReturnModel
    {
        public User User { get; set; }
        public string Token { get; set; }
        public string TipoUsuario { get; set; }
    }
}
