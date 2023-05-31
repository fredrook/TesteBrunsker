using Immobiliaria.Models;
using Imobiliaria.Domain;

namespace Imobiliaria.Models
{
    public class Usuario : BaseModel
    {
        public int IdUsuario { get; set; }
        public string Login { get; set; }
        public string Nome { get; set; }
        public string Senha { get; set; }
        public string Email { get; set; }
        public string TipoUsuario { get; set; }

        public Imovel Imovel { get; set; }
        public int? IdImovel { get; set; }

        public Usuario() { }

        public Usuario(
            string login,
            string nome,
            string email,
            string tipoUsuario,
            Imovel imovel,
            string usuarioInclusao
            )
        {
            this.Login = ValidaDomain.ValidaCampoNulo("Login", login);
            this.Nome = ValidaDomain.ValidaCampoNulo("Nome", nome);
            this.Email = ValidaDomain.ValidaEmail(email);
            this.TipoUsuario = ValidaDomain.ValidaCampoNulo("Tipo Usuário", tipoUsuario);
            SetUsuarioInclusao(usuarioInclusao);

            switch (tipoUsuario)
            {
                case "Root": // responsavel pela gestão de usuários e imoveis 
                    this.Imovel = ValidaDomain.ValidaEntidadeNull("Imovel", imovel);
                    break;

                case "Administrador":
                    this.Imovel = ValidaDomain.ValidaEntidadeNull("Imovel", imovel);
                    break;

                case "Atendente":
                    this.Imovel = ValidaDomain.ValidaEntidadeNull("Imovel", imovel);
                    break;

                case "Corretor":
                    this.Imovel = ValidaDomain.ValidaEntidadeNull("Imovel", imovel);
                    break;

                case "Locador":
                    this.Imovel = ValidaDomain.ValidaEntidadeNull("Imovel", imovel);
                    break;

                case "Locatário":
                    this.Imovel = ValidaDomain.ValidaEntidadeNull("Imovel", imovel);
                    break;

                default:
                    throw new Exception("Perfil obrigatório ");
            }
            this.Senha = "123456";
        }

        public void AlterarSenha(string senha, string primeiroAcesso)
        {
            this.Senha = senha;

            if (string.IsNullOrEmpty(senha))
                throw new Exception("Senha obrigatório ");
        }

        public void ResetarSenha(string usuarioAlteracao)
        {
            this.Senha = "123456";
            SetUsuarioAlteracao(usuarioAlteracao);
        }

        public void GerarTokenRecuperacaoSenha()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var stringChars = new char[8];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
                stringChars[i] = chars[random.Next(chars.Length)];
        }

        public void GerarTokenCriacaoSenha()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var stringChars = new char[8];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
                stringChars[i] = chars[random.Next(chars.Length)];
        }

        public void Inativar(string usuarioAlteracao)
        {
            this.Situacao = "Inativo";
            SetUsuarioAlteracao(usuarioAlteracao);
        }

        public void Ativar(string usuarioAlteracao)
        {
            this.Situacao = "Ativo";
            SetUsuarioAlteracao(usuarioAlteracao);
        }

        internal void Excluir(string usuarioExclusao)
        {
            this.Situacao = "Excluir";
            SetUsuarioExclusao(usuarioExclusao);
        }
    }
}
