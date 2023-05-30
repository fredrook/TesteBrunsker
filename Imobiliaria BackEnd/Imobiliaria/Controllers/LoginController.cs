using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Imobiliaria.Infra;
using Imobiliaria.Models.SecurityToken;
using System.Linq;
using System.Threading.Tasks;

namespace Imobiliaria.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;

        protected Context context;
        public LoginController(Context context,
            IConfiguration config)   // : base(context)
        {
            _config = config;
            this.context = context;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> AuthenticateAsync([FromBody] User model)
       {
            var usuario = context.Usuario.FirstOrDefault(x => x.Login == model.Username && x.Senha == model.Password);
            if (usuario == null)
                return BadRequest("Usuário ou senha invalidos");

            model.Role = "Admin";
            var token = TokenService.GenerateToken(model);
            model.Password = "";

            var result = new TokenReturnModel()
            {
                Token = token,
                User = model,
                TipoUsuario = usuario.TipoUsuario,
                IdImovel = usuario.IdImovel,
            };

            return result;
        }


        [HttpPost]
        [Route("loginportal")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> AuthenticateAsyncPortal([FromBody] User model)
        {
            var usuario = context.Usuario.FirstOrDefault(x => x.Login == model.Username && x.Senha == model.Password);
            if (usuario == null)
                return BadRequest("Usuário ou senha invalidos");

            model.Role = "Usuario";
            var token = TokenService.GenerateToken(model);
            model.Password = "";

            var result = new TokenReturnModel()
            {
                Token = token,
                User = model,
                TipoUsuario = "Locatário",
                IdImovel = 0
            };

            return result;
        }
    }
}
