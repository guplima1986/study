let todosUsuarios = [];

window.addEventListener('load', () => {
  tabUsuarios = document.querySelector('#tabUsuarios');
  tabEstatistica = document.querySelector('#tabEstatistica');

  countSexoMasculino = document.querySelector('#sexoMasculino');
  countSexoFeminino = document.querySelector('#sexoFeminino');

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
        name: name.first + ' ' + name.last,
        gender: gender,
        age: dob.age,
        picture: picture.medium,
      };
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  render();
}

function render() {
  fetchUsuarios();
  renderUsuariosList();
}

function formatNumber(number) {
  return numberFormat.format(number);
}

function renderUsuariosList() {
  let usuariosHTML = '<div>';

  todosUsuarios.forEach((usuario) => {
    const { name, gender, age, picture } = usuario;

    const usuarioHMTL = `
      <div class='usuarios'>
        <div>
            <ul>
                <li>
                <img src="${picture}" alt="${name}" class="img-fluid" alt="Responsive image">
                ${name}, ${age} anos
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
