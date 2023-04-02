"use strict"
if (!localStorage.getItem('RecadOSRegistros')) {
    localStorage.setItem('RecadOSRegistros', JSON.stringify([]));
}
let usuariosRegistros = JSON.parse(localStorage.getItem('RecadOSRegistros'));
let usuarioLogado = sessionStorage.getItem('RecadOSLogado');

// ANIMACAO TELA DE LOGIN
const formContainer = document.querySelector('.formContainer');
const formSignIn = document.querySelector('.formSignIn');
const formSignUp = document.querySelector('.formSignUp');
const switchForm = (form) => {
    if (form == 'signup') {
        if (window.innerWidth > 800) {
            formContainer.style.left = `50%`;
        }
        formSignIn.style.marginLeft = `-150%`;
        formSignUp.style.marginLeft = `-100%`;
    }
    else {
        if (window.innerWidth > 800) {
            formContainer.style.left = `0%`;
        }
        formSignIn.style.marginLeft = `0%`;
        formSignUp.style.marginLeft = `50%`;
    }
};
document.addEventListener('DOMContentLoaded', () => {
    if (usuarioLogado) {
        window.location.href = "recados.html";
    }
})

// SIGN IN
let signInEmail = document.querySelector('.signInEmail');
let signInSenha = document.querySelector('.signInSenha');
let signInBotao = document.querySelector('.signInBotao');
formSignIn.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if (!signInEmail.value || !signInSenha.value) {
        alertaBootstrap('Preencha todos os campos !', 'warning');
        return;
    }
    let usuarioExistente = usuariosRegistros.find(
        (valor) => valor.email === signInEmail.value && valor.senha === signInSenha.value);
    if (!usuarioExistente) {
        alertaBootstrap('E-mail ou Senha inválidos !', 'danger');
        return;
    }
    salvarSession(signInEmail.value);
    window.location.href = "recados.html";
});
function salvarSession(data) {
    JSON.stringify(sessionStorage.setItem("RecadOSLogado", data));
};

// SIGN UP
let signUpNome = document.querySelector('.signUpNome');
let signUpEmail = document.querySelector('.signUpEmail');
let signUpSenha1 = document.querySelector('.signUpSenha1');
let signUpSenha2 = document.querySelector('.signUpSenha2');
let signUpBotao = document.querySelector('.signUpBotao');
formSignUp.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if (!signUpNome.value || !signUpEmail.value || !signUpSenha1.value || !signUpSenha2.value) {
        alertaBootstrap('Preencha todos os campos !', 'warning');
        return;
    }
    if (signUpNome.value.length < 5) {
        alertaBootstrap('Nome deve ter no minimo 5 caracteres.', 'warning');
        return;
    }
    if (signUpSenha1.value.length < 6 || signUpSenha2.value.length < 6) {
        alertaBootstrap('Senhas devem ter no minimo 6 caracteres.', 'warning');
        return;
    }
    if (signUpSenha1.value !== signUpSenha2.value) {
        alertaBootstrap('As senhas não conferem !', 'danger');
        return;
    }
    const usuarioExistente = usuariosRegistros.some((user) => user.email === signUpEmail.value);
    if (usuarioExistente) {
        alertaBootstrap('E-Mail já cadastrado !', 'warning');
        return;
    }
    const dadosInformados = {
        id: Math.floor(Math.random() * 65536),
        nome: signUpNome.value,
        email: signUpEmail.value,
        senha: signUpSenha1.value,
        recados: []
    }
    usuariosRegistros.push(dadosInformados);
    salvarLocal(usuariosRegistros);
    alertaBootstrap('Usuário cadastrado com sucesso !', 'success');
    setTimeout(() => {
        window.location.reload(true);
    }, 2500);
});
function salvarLocal(usuariosRegistros) {
    localStorage.setItem('RecadOSRegistros', JSON.stringify(usuariosRegistros));
};