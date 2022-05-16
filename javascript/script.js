// Formulários Completos
let formRegistrar = document.getElementById('formulario__registrar');
let formCorrigir = document.getElementById('formulario__corrigir')

// Botões dos Formulários
let botRegistrar = document.getElementById('botao__registrar');
let botCorrigir = document.getElementById('botao__corrigir');
let botMostrar = document.getElementById('botao__mostrar');
let botExcluir = document.getElementById('botao__excluir');

//Tabela
let tabela = document.getElementById('tabela');
let corpoTabela = document.getElementsByTagName('tbody')[0]

botRegistrar.addEventListener('click', AdicaoNovaLinha);
botCorrigir.addEventListener('click', CorrigirLinha);
botMostrar.addEventListener('click', VisibilidadeTabela);
botExcluir.addEventListener('click', RemoverLinha);


let contagemLinhas = corpoTabela.getElementsByTagName('tr').length;
let linhaSelecionada;

let inputRegistrarNome = document.getElementById('registrar__nome');
let inputCorrigirNome = document.getElementById('corrigir__nome');
inputRegistrarNome.addEventListener('input',ValidacaoNome)
inputCorrigirNome.addEventListener('input',ValidacaoNome)

let inputRegistrarCpf = document.getElementById('registrar__cpf');
let inputCorrigirCpf = document.getElementById('corrigir__cpf');
inputRegistrarCpf.addEventListener('input', MascaraCpf);
inputCorrigirCpf.addEventListener('input', MascaraCpf);

let inputRegistrarTelefone = document.getElementById('registrar__telefone');
let inputCorrigirTelefone = document.getElementById('corrigir__telefone');
inputRegistrarTelefone.addEventListener('input', MascaraTelefone);
inputCorrigirTelefone.addEventListener('input', MascaraTelefone);


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

function ValidacaoNome(){
    for(let i = 0; i< 10; i++){
        if(this.value.indexOf(`${i}`) != -1){
            this.value = this.value.replace(`${i}`,'')
        }
    }
}

function ValidacaoNumeros(input){
    input.value = input.value.replace(/\D/g,'')
}


function MascaraCpf(){
    ValidacaoNumeros(this)
    if(this.value.length == 11 && this.value.indexOf('.') == -1){
        let cpfNumeros = this.value
        let cpfFormatado = [];
        for(let x = 0; x < this.value.length; x++){
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
        this.value = cpfFormatado.join('')
    }else if(this.value.indexOf('.') != -1){
        let x = 0
        while(this.value.indexOf('.') != -1 && x !=3){
            this.value = this.value.replace('.','');
            this.value = this.value.replace('-','')
            x++
        }
    }
};

function MascaraTelefone(){
    ValidacaoNumeros(this)
    if(this.value.length == 11 && this.value.indexOf('(') == -1){
        let telefoneNumeros = this.value
        let telefoneFormatado = [];
        for(let x = 0; x < this.value.length; x++){
            switch(x){
                case 0:
                    telefoneFormatado.push(telefoneNumeros[x]);
                    telefoneFormatado.unshift('(');
                    break;
                case 1:
                    telefoneFormatado.push(telefoneNumeros[x])
                    telefoneFormatado.push(')')
                    break;
                case 2:
                    telefoneFormatado.push(' ')
                    telefoneFormatado.push(telefoneNumeros[x])
                    telefoneFormatado.push(' ')
                    break;
                case 6:
                    telefoneFormatado.push(telefoneNumeros[x])
                    telefoneFormatado.push('-')
                    break;
                default:
                    telefoneFormatado.push(telefoneNumeros[x])
                    break;    
            }
        }
        this.value = telefoneFormatado.join('')
    }else if(this.value.indexOf(' ') != -1){
        let x = 0
        while(this.value.indexOf(' ') != -1 && x !=3){
            this.value = this.value.replace('(','');
            this.value = this.value.replace(')','')
            this.value = this.value.replace('-','')
            this.value = this.value.replace(' ','')
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
    linhaSelecionada.classList.remove('table-info')
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

function RemoverLinha(){
    LimpezaInputs(formRegistrar);
    LimpezaInputs(formCorrigir);
    linhaSelecionada.parentNode.removeChild(linhaSelecionada);
    formRegistrar.classList.remove('esconder');
    formCorrigir.classList.add('esconder');
}