let todosUsuarios = [];
let totalSexoMasculino = 0;
let totalSexoFeminino = 0;
let somaIdades = 0;
let mediaIdades = 0;

window.addEventListener('load', () => {
  tabUsuarios = document.querySelector('#tabUsuarios');
  tabEstatistica = document.querySelector('#tabEstatistica');

  countSexoMasculino = document.querySelector('#sexoMasculino');
  countSexoFeminino = document.querySelector('#sexoFeminino');

  botaoPesquisar = document.querySelector('#botaoPesquisar');
  totalUsuarios = document.querySelector('#totalUsuarios');
  countIdades = document.querySelector('#somaIdades');
  mediaIdades = document.querySelector('#mediaIdades');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchUsuarios();
});

async function fetchUsuarios() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  todosUsuarios = json.results
    .map((usuario) => {
      const { name, gender, dob, picture } = usuario;
      return {
        nome: name.first + ' ' + name.last,
        sexo: gender,
        idade: dob.age,
        foto: picture.thumbnail,
      };
    })
    .sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });

  render();
}

function render() {
  fetchUsuarios();
}

function formatNumber(number) {
  return numberFormat.format(number);
}

function renderUsuariosList(pesquisaUsuarios) {
  let usuariosHTML = '<div>';

  pesquisaUsuarios.forEach((usuario) => {
    const { nome, sexo, idade, foto } = usuario;

    const usuarioHMTL = `
      <div class='usuarios'>
        <div>
            <ul>
                <li>
                <img src="${foto}" alt="${nome}" class="img-fluid" alt="Responsive image">
                ${nome}, ${idade} anos
                </li>
            </ul>
        </div>
      </div>
      `;
    usuariosHTML += usuarioHMTL;
  });

  usuariosHTML += '</div> ';

  tabUsuarios.innerHTML = usuariosHTML;
}

function renderEstatistica(pesquisaUsuarios) {
  countSexoMasculino.textContent = pesquisaUsuarios.filter(
    (usuario) => usuario.sexo === 'male'
  ).length;

  countSexoFeminino.textContent = pesquisaUsuarios.filter(
    (usuario) => usuario.sexo === 'female'
  ).length;

  const totalIdade = pesquisaUsuarios.reduce((acc, curr) => {
    return acc + curr.idade;
  }, 0);

  const totalUser = pesquisaUsuarios.length;

  const media = totalIdade / totalUser;

  countIdades.textContent = formatNumber(totalIdade);
  totalUsuarios.textContent = totalUser;
  mediaIdades.textContent = media;
}

function findUsuario(texto) {
  pesquisaUsuarios = todosUsuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(texto.toLowerCase())
  );
  renderUsuariosList(pesquisaUsuarios);
  renderEstatistica(pesquisaUsuarios);
  render();
}

function renderButton() {
  botaoPesquisar.addEventListener('click', () =>
    findUsuario(document.getElementById('idInput').value)
  );
}
