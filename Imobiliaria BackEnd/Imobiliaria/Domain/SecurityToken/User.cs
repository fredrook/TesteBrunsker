﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Imobiliaria.Models.SecurityToken
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Login { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
        public string Grant_Type { get; set; }
    }
}
