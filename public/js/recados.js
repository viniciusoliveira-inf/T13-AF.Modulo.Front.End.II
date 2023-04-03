const usuariosRegistros = JSON.parse(localStorage.getItem('RecadOSRegistros') || '[]');
const usuarioLogado = sessionStorage.getItem('RecadOSLogado');
const modalExcluir = new bootstrap.Modal('#modalExcluir')
const formRecado = document.getElementById('formRecados');
let tituloUsuario = document.getElementById('tituloNome');
let botaoSair = document.querySelector('.sairBotao');
let localRecado = document.getElementById('localRecados');
let botaoEditar = false;
const usuarioProcurado = usuariosRegistros.find(
    (valor) => valor.email == usuarioLogado);
document.addEventListener('DOMContentLoaded', (() => {
    if (!usuarioLogado) {
        alertaBootstrap('Você precisa estar logado para acessar essa página !', 'danger');
        window.location.href = 'index.html';
    }
    tituloUsuario.innerHTML = `Olá, <span>${usuarioProcurado.nome}</span> `;
    botaoSair.addEventListener('click', sair);
    usuarioProcurado.recados.forEach((recado) => mostrarRecados(recado));
}))
formRecado.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!botaoEditar) {
        criarRecados()
    } else if (botaoEditar) {
        const recadoEditado = {
            id: id,
            descricao: textoDescricao.value,
            detalhamento: textoDetalhamento.value,
        }
        const indiceEditado = usuarioProcurado.recados.findIndex((recado) => recado.id === id);
        usuarioProcurado.recados[indiceEditado].descricao = recadoEditado.descricao;
        usuarioProcurado.recados[indiceEditado].detalhamento = recadoEditado.detalhamento;
        atualizarDadosUsuario(usuarioProcurado)
        alertaBootstrap('Recado atualizado com sucesso !', 'success');
        localRecado.innerHTML = ''
        usuarioProcurado.recados.forEach((recado) => mostrarRecados(recado))
        formRecado.reset()
        botaoEditar = false
    } else {
        alertaBootstrap('Erro do sistema !', 'danger');
    }
})
function mostrarRecados(novoRecado) {
    const trTable = document.createElement('tr');
    trTable.setAttribute('id', `${novoRecado.id}`);
    trTable.classList.add('linha-tr');
    const tdId = document.createElement('td');
    tdId.innerHTML = `${novoRecado.id}`;
    const tdDescricao = document.createElement('td');
    tdDescricao.innerHTML = novoRecado.descricao;
    const tdDetalhamento = document.createElement('td')
    tdDetalhamento.innerHTML = novoRecado.detalhamento
    const tdBotoes = document.createElement('td')
    const botaoEditar = document.createElement('button');
    botaoEditar.setAttribute('class', 'botaoEditar btn btn-dark');
    botaoEditar.innerText = 'Editar';
    botaoEditar.addEventListener('click', () => {
        editar(novoRecado)
    });
    const botaoExcluir = document.createElement('button');
    botaoExcluir.setAttribute('class', 'botaoExcluir btn btn-dark');
    botaoExcluir.innerText = 'Apagar';
    botaoExcluir.addEventListener('click', () => {
        modalExcluir.show()
        const buttonSimModal = document.getElementById('buttonSim')
        buttonSimModal.setAttribute('onclick', `apagar(${novoRecado.id})`)
    })
    trTable.appendChild(tdId);
    trTable.appendChild(tdDescricao);
    trTable.appendChild(tdDetalhamento);
    tdBotoes.appendChild(botaoEditar);
    tdBotoes.appendChild(botaoExcluir);
    trTable.appendChild(tdBotoes);
    localRecado.appendChild(trTable)
    document.querySelector('.textoDescricao').focus();
}
function criarRecados() {
    let recadoDescricao = textoDescricao.value;
    let recadoDetalhamento = textoDetalhamento.value;
    if (!recadoDescricao || !recadoDetalhamento) {
        alertaBootstrap('A descrição e o detalhamento devem ser preenchidos !', 'warning');
        return
    }
    const novoRecado = {
        id: Math.floor(Math.random() * 65536),
        descricao: recadoDescricao,
        detalhamento: recadoDetalhamento
    }
    usuarioProcurado.recados.push(novoRecado);
    atualizarDadosUsuario(usuarioProcurado)
    alertaBootstrap('Recado cadastrado com sucesso !', 'success');
    formRecado.reset()
    mostrarRecados(novoRecado)
}
function atualizarDadosUsuario(dadosAtualizados) {
    let usuario = usuariosRegistros.find(
        (valor) => valor.email == usuarioLogado);
    usuario = dadosAtualizados;
    atualizarStorage();
}
function atualizarStorage() {
    localStorage.setItem('RecadOSRegistros', JSON.stringify(usuariosRegistros));
}
function editar(recado) {
    botaoEditar = true;
    id = recado.id;
    textoDescricao.value = recado.descricao;
    textoDetalhamento.value = recado.detalhamento;
}
function apagar(id) {
    const indiceEncontrado = usuarioProcurado.recados.findIndex((recado) => recado.id === id);
    let trRecadoExcluir = document.getElementById(id);
    trRecadoExcluir.remove();
    usuarioProcurado.recados.splice(indiceEncontrado, 1);
    atualizarDadosUsuario(usuarioProcurado);
    alertaBootstrap('Recado excluido !', 'danger');
}
function sair() {
    sessionStorage.removeItem('RecadOSLogado');
    window.location.href = 'index.html';
}