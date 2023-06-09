CREATE TABLE Usuario (
  IdUsuario INT PRIMARY KEY,
  Login VARCHAR(50),
  Nome VARCHAR(50),
  Senha VARCHAR(50),
  TipoUsuario BOOL,
  UsuarioInclusao VARCHAR(50),
  UsuarioAlteracao VARCHAR(50),
  UsuarioExclusao VARCHAR(50),
  DataInclusao DATETIME,
  DataAlteracao DATETIME,
  DataExclusao DATETIME,
  Situacao VARCHAR(50)
);


CREATE TABLE Imovel (
  IdImovel INT PRIMARY KEY,
  NomeImovel VARCHAR(50),
  NQuarto INT,
  NBanheiro INT,
  MetrosQuadrados INT,
  IdUsuario INT,
  Estado VARCHAR(50),
  Cidade VARCHAR(50),
  Bairro VARCHAR(50),
  Logradouro VARCHAR(50),
  Numero INT,
  Complemento VARCHAR(50),
  Referencia VARCHAR(50),
  UsuarioInclusao VARCHAR(50),
  UsuarioAlteracao VARCHAR(50),
  UsuarioExclusao VARCHAR(50),
  DataInclusao DATETIME,
  DataAlteracao DATETIME,
  DataExclusao DATETIME,
  Situacao VARCHAR(50),
  FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario)
);


CREATE TABLE Locacao (
  IdUsuario INT,
  IdImovel INT,
  DataLocacao DATETIME,
  DataDeslocacao DATETIME,
  FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
  FOREIGN KEY (IdImovel) REFERENCES Imovel(IdImovel),
  PRIMARY KEY (IdUsuario, IdImovel)
);