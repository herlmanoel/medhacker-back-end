const gerarSenha = (tamanho = 10) => {
  let password = "";

  do {
    password += Math.random().toString(36).substr(2);
  } while (password.length <= tamanho);

  password = password.substr(0, tamanho);

  return password;
};

module.exports = { gerarSenha };
