using Imobiliaria.Domain;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Imobiliaria.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Imobiliaria.Infrastructure.Mapping
{
    public class ImovelMap : BaseModelMap<Imovel>
    {
        public override void Configure(EntityTypeBuilder<Imovel> builder)
        {
            builder.HasKey(c => c.IdImovel);

            builder.Property(m => m.NomeImovel);
            builder.Property(m => m.NQuarto);
            builder.Property(m => m.NBanheiro);
            builder.Property(m => m.MetrosQuadrados);

            builder.Property(p => p.Estado);
            builder.Property(p => p.Cidade);
            builder.Property(p => p.Bairro);

            builder.Property(t => t.Logradouro);
            builder.Property(t => t.Numero);
            builder.Property(t => t.Complemento);
            builder.Property(t => t.Referencia);


            base.Configure(builder);
        }
    }
}