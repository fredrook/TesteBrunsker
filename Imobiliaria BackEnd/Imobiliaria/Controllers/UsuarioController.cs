using Imobiliaria.Infra;
using Imobiliaria.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq.Expressions;
using static Imobiliaria.Models.UsuarioModel;

namespace Imobiliaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsuarioController : ControllerBase
    {
        private IConfiguration _config;
        protected Context context;
        public UsuarioController(Context context,
            IConfiguration config)
        {
            _config = config;
            this.context = context;
        }

        [HttpPost]
        [Route("salvarUsuario")]
        [Authorize]
        public IActionResult SalvarUsuario([FromBody] UsuarioModel model)
        {
            var usuarioLogado = context.Usuario.FirstOrDefault(x => x.Login == User.Identity.Name);
            var res = context.Usuario.FirstOrDefault(x => x.Login == model.Login);
            if (res != null)
                return BadRequest("Úsuario já cadastrado");
            var imovel = context.Imovel.FirstOrDefault(x => x.IdImovel == model.IdImovel);

            var usuario = new Usuario(
                model.Login,
                model.Nome,
                model.Email,
                model.TipoUsuario,
                imovel,
                usuarioLogado.Login
                );

            context.Usuario.Add(usuario);
            context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("listarUsuario")]
        [Authorize]
        public IActionResult ListarUsuario([FromBody] FiltroUsuarioModel model)
        {
            ICollection<UsuarioModel> resultado = null;
            Expression<Func<Usuario, bool>> filtroNome = registro => true;

            #region filtros

            if (!string.IsNullOrEmpty(model.Nome))
                filtroNome = (Usuario registro) => registro.Nome.Contains(model.Nome);

            #endregion

            resultado = context.Usuario
                 .Where(filtroNome)
                 .Select(m => new UsuarioModel
                 {
                     IdUsuario = m.IdUsuario,
                     Nome = m.Nome,
                     Email = m.Email,
                     TipoUsuario = m.TipoUsuario,
                     Situacao = m.Situacao
                 }).ToList();
            return Ok(resultado);
        }

        [HttpGet]
        [Route("obterUsuario")]
        [Authorize]
        public IActionResult ObterUsuario(int idUsuario)
        {
            var usuario = context.Usuario.FirstOrDefault(x => x.IdUsuario == idUsuario);
            if (usuario == null)
                return BadRequest("Usuário não encontrado ");

            var model = new UsuarioModel();
            model.TipoUsuario = usuario.TipoUsuario;
            model.IdUsuario = usuario.IdUsuario;
            model.IdImovel = usuario.IdImovel;
            model.Login = usuario.Login;
            model.Email = usuario.Email;
            model.Nome = usuario.Nome;
            model.Situacao = usuario.Situacao;

            return Ok(model);
        }


        [HttpGet]
        [Route("desativarUsuario")]
        [Authorize]
        public IActionResult DesativarUsuario(int idUsuario)
        {
            var usuario = context.Usuario.FirstOrDefault(x => x.IdUsuario == idUsuario);
            if (usuario == null)
                return BadRequest("Usuário não encontrado");

            usuario.Inativar(User.Identity.Name);

            context.Usuario.Update(usuario);
            context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("ativarUsuario")]
        [Authorize]
        public IActionResult AtivarUsuario(int idUsuario)
        {
            var usuario = context.Usuario.FirstOrDefault(x => x.IdUsuario == idUsuario);
            if (usuario == null)
                return BadRequest("Usuário não encontrado");

            usuario.Ativar(User.Identity.Name);

            context.Usuario.Update(usuario);
            context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("resetarSenha")]
        [Authorize]
        public IActionResult ResetarSenha(int idUsuario)
        {
            var usuario = context.Usuario.FirstOrDefault(x => x.IdUsuario == idUsuario);
            if (usuario == null)
                return BadRequest("Usuário não encontrado");

            usuario.ResetarSenha(User.Identity.Name);

            context.Usuario.Update(usuario);
            context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("verificarLoginDuplicado")]
        [Authorize]
        public IActionResult VerificarLoginDuplicado(string login)
        {
            var res = context.Usuario.FirstOrDefault(x => x.Login == login);
            if (res == null)
                return Ok(true);
            else
                return Ok(false);
        }

        [HttpPost]
        [Route("alterarSenha")]
        [Authorize]
        public IActionResult AlterarSenha([FromBody] AlterarSenhaModel model)
        {
            var usuario = context.Usuario.FirstOrDefault(x => x.Login == User.Identity.Name);

            if (model.Senha != usuario.Senha)
                return BadRequest("Senha atual incorreta ");

            if (model.NovaSenha != model.ConfirmarNovaSenha)
                return BadRequest("Nova senha e Confirmar nova senha inválida ");


            usuario.AlterarSenha(model.NovaSenha, model.ConfirmarNovaSenha );


            context.Update(usuario);
            context.SaveChanges();

            return Ok();
        }
    }
}
