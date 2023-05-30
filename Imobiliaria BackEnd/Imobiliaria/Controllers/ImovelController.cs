using Imobiliaria.Domain;
using Imobiliaria.Infra;
using Imobiliaria.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Linq.Expressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;


namespace Imobiliaria.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImovelController : ControllerBase
    {
        private IConfiguration _config;
        protected Context context;
        public ImovelController(Context context,
            IConfiguration config)
        {
            _config = config;
            this.context = context;
        }


        [HttpPost]
        [Route("salvar")]
        [Authorize]
        public IActionResult Salvar([FromBody] ImovelModel model)
        {
            Imovel imovel;
            if (model.IdImovel > 0)
            {
                imovel = context.Imovel.FirstOrDefault(x => x.IdImovel == model.IdImovel);
                imovel.Alterar(model.NomeImovel, model.MetrosQuadrados, model.NQuarto, model.Vaga, model.NBanheiro, model.ValorLocacao, model.Locado, model.Estado, model.Cidade, model.Bairro, model.Logradouro, model.Numero, model.Complemento, model.Referencia, User.Identity.Name);

                context.Update(imovel);
            }
            else
            {
                imovel = new Imovel(model.NomeImovel, model.MetrosQuadrados, model.NQuarto, model.Vaga, model.NBanheiro, model.ValorLocacao, model.Locado, model.Estado, model.Cidade, model.Bairro, model.Logradouro, model.Numero, model.Complemento, model.Referencia, User.Identity.Name);
                context.Imovel.Add(imovel);
            }
            context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("listar")]
        [Authorize]
        public IActionResult Listar([FromBody] ImovelModel model)
        {
            Expression<Func<Imovel, bool>> filtroNome = registro => true;

            #region filtros

            if (!string.IsNullOrEmpty(model.NomeImovel))
                filtroNome = (Imovel registro) => registro.NomeImovel.Contains(model.NomeImovel);
            #endregion

            var resultado = context.Imovel
                  .Where(filtroNome)
                  .Select(m => new
                  {
                      IdImovel = m.IdImovel,
                      NomeImovel = m.NomeImovel,
                      MetrosQuadrados = m.MetrosQuadrados,
                      NQuarto = m.NQuarto,
                      Vaga = m.Vaga,
                      NBanheiro = m.NBanheiro,
                      ValorLocacao = m.ValorLocacao,
                      Estado = m.Estado,
                      Cidade = m.Cidade,
                      Bairro = m.Bairro,
                      Logradouro = m.Logradouro,
                      Numero = m.Numero,
                      Complemento = m.Complemento,
                      Referencia = m.Referencia,
                      Locado = m.Locado,
                  }).ToList();
            return Ok(resultado);
        }

        [HttpGet]
        [Route("alterarValor")]
        [Authorize]
        public IActionResult AlterarValorClinica(int idImovel, bool alterarValor)
        {
            Imovel imovel;

            imovel = context.Imovel.FirstOrDefault(x => x.IdImovel == idImovel);
            imovel.AlterarValorImovel(alterarValor, User.Identity.Name);

            context.Update(imovel);

            context.SaveChanges();
            return Ok(new { message = $"Campo AlterarValor alterado para {alterarValor}" });
        }

        [HttpGet]
        [Route("excluir")]
        [Authorize]
        public IActionResult Exckluir(int idImovel)
        {
            var imovel = context.Imovel.FirstOrDefault(x => x.IdImovel == idImovel);
            imovel.Excluir(User.Identity.Name);

            context.Update(imovel);
            context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("obter")]
        [Authorize]
        public IActionResult Obter(int idImovel)
        {
            var resultado = context.Imovel
                 .Select(m => new
                 {
                     IdImovel = m.IdImovel,
                     NomeImovel = m.NomeImovel,
                     MetrosQuadrados = m.MetrosQuadrados,
                     NQuarto = m.NQuarto,
                     Vaga = m.Vaga,
                     NBanheiro = m.NBanheiro,
                     ValorLocacao = m.ValorLocacao,
                     Estado = m.Estado,
                     Cidade = m.Cidade,
                     Bairro = m.Bairro,
                     Logradouro = m.Logradouro,
                     Numero = m.Numero,
                     Complemento = m.Complemento,
                     Referencia = m.Referencia,
                     Locado = m.Locado,
                     Situacao = m.Situacao,
                     m.AlterarValor
                 }).FirstOrDefault(x => x.IdImovel == idImovel);
            return Ok(resultado);
        }
    }
}
