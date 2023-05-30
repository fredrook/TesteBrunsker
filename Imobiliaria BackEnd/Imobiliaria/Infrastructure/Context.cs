using Imobiliaria.Models;
using Imobiliaria.Domain;
using Microsoft.EntityFrameworkCore;
using Imobiliaria.Infrastructure.Mapping;

namespace Imobiliaria.Infra
{
    public class Context : DbContext
    {
        public virtual DbSet<Usuario> Usuario { get; set; }
        public virtual DbSet<Imovel> Imovel { get; set; }

        public Context(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>(new UsuarioMap().Configure);
            modelBuilder.Entity<Imovel>(new ImovelMap().Configure);
        }
    }
}
