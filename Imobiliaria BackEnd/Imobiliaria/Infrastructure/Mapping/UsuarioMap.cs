using Imobiliaria.Domain;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Imobiliaria.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Imobiliaria.Infrastructure.Mapping
{
    public class UsuarioMap : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.HasKey(c => c.IdUsuario);
            builder.Property(c => c.Nome);
            builder.Property(c => c.Login);
            builder.Property(c => c.Senha);
            builder.Property(c => c.Email);
            builder.Property(c => c.TipoUsuario);


            builder.HasOne(m => m.Imovel)
                .WithMany()
                .HasForeignKey(m => m.IdImovel);

            builder.Property(c => c.UsuarioInclusao);
            builder.Property(c => c.DataInclusao);
            builder.Property(c => c.UsuarioAlteracao);
            builder.Property(c => c.DataAlteracao);
            builder.Property(c => c.UsuarioExclusao);
            builder.Property(c => c.DataExclusao);
            builder.Property(c => c.Situacao);
        }
    }
}