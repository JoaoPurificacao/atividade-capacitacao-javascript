// Formulários Completos
let formRegistrar = document.getElementById('formulario__registrar');
let formCorrigir = document.getElementById('formulario__corrigir')

// Botões dos Formulários
let botRegistrar = document.getElementById('botao__registrar');
let botCorrigir = document.getElementById('botao__corrigir');
let botMostrar = document.getElementById('botao__mostrar');
let tabela = document.getElementById('tabela');
let corpoTabela = document.getElementsByTagName('tbody')[0]

botRegistrar.addEventListener('click', AdicaoNovaLinha);
botCorrigir.addEventListener('click', CorrigirLinha);
botMostrar.addEventListener('click', VisibilidadeTabela);


let contagemLinhas = corpoTabela.getElementsByTagName('tr').length;
let linhaSelecionada;

let inputRegistrarCpf = document.getElementById('registrar__cpf');
inputRegistrarCpf.addEventListener('input', mascaracpf);

function seMostrar(e){
    console.log(this);
};

function VisibilidadeTabela (x){
    let classesTabela = tabela.className
    if(classesTabela.indexOf('esconder') == -1){
        tabela.classList.add('esconder')
    }else{
        tabela.classList.remove('esconder')
    }
    Passando_rodo();
};

function mascaracpf(){
    if(inputRegistrarCpf.value.length == 11 && inputRegistrarCpf.value.indexOf('.') == -1){
        let cpfNumeros = inputRegistrarCpf.value
        let cpfFormatado = [];
        for(let x = 0; x < inputRegistrarCpf.value.length; x++){
            if(x == 2 || x == 5 ){
                cpfFormatado.push(cpfNumeros[x])
                cpfFormatado.push('.')
            }else if(x == 8){
                cpfFormatado.push(cpfNumeros[x])
                cpfFormatado.push('-')
            }else{
                cpfFormatado.push(cpfNumeros[x])
            }
        }
        inputRegistrarCpf.value = cpfFormatado.join('')
    }else if(inputRegistrarCpf.value.indexOf('.') != -1){
        let x = 0
        while(inputRegistrarCpf.value.indexOf('.') != -1 && x !=3){
            inputRegistrarCpf.value = inputRegistrarCpf.value.replace('.','');
            inputRegistrarCpf.value = inputRegistrarCpf.value.replace('-','')
            x++
        }
    }
};

function Passando_rodo(){
    let rows = document.querySelectorAll('.cadastro__row');
    for(let item of rows){
        item.addEventListener('click', SelecionarLinha);
    };
};

function SelecionarLinha(){
    let oldSelectRow = document.querySelectorAll('.table-info')[0];
    if(oldSelectRow == undefined){
        this.classList.add('table-info');
    }else if(oldSelectRow.id != this.id){
        oldSelectRow.classList.remove('table-info')
        this.classList.add('table-info');
    }else{
        oldSelectRow.classList.remove('table-info')
        this.classList.add('table-info');
    };
    linhaSelecionada = CarregarCadastro(this)
    formRegistrar.classList.add('esconder');
    formCorrigir.classList.remove('esconder');
};

function LimpezaInputs(formulario){
    formulario.getElementsByTagName('input');
    for(let item of formulario){
        item.value = '';
    }
}

function CriacaoLinha(){
    let novaLinha = document.createElement('tr')
    let colunaID = document.createElement('th')
    let inputsRegistrar = formRegistrar.getElementsByTagName('input');

    novaLinha.appendChild(colunaID)
    colunaID.scope = 'row'
    colunaID.textContent = ++contagemLinhas
    novaLinha.id = contagemLinhas

    for(let input of inputsRegistrar){
        let novaCelula = document.createElement('td');
        novaCelula.textContent = input.value;
        novaLinha.appendChild(novaCelula);
    };
    
    novaLinha.classList.add('cadastro__row')
    corpoTabela.appendChild(novaLinha)
}

function AdicaoNovaLinha(){
    CriacaoLinha();
    Passando_rodo();
    LimpezaInputs(formRegistrar);
    formRegistrar.classList.remove('esconder');
    formCorrigir.classList.add('esconder');
}

function CorrigirLinha(){
    let inputs = formCorrigir.getElementsByTagName('input')
    let celulas = linhaSelecionada.getElementsByTagName('td')
    for(let i = 0; i < inputs.length; i++){
        celulas[i].textContent = inputs[i].value
    }
    LimpezaInputs(formCorrigir);
    formRegistrar.classList.remove('esconder');
    formCorrigir.classList.add('esconder');
};

function CarregarCadastro(linha){
    let celulas = linha.getElementsByTagName('td')
    let inputs = formCorrigir.getElementsByTagName('input')
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = celulas[i].textContent
    }
    return linha
};
