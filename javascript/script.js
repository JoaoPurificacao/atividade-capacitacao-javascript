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

window.addEventListener('load', RecarregarTabelaStorage);

//Validações nos Campos de Nome
let inputRegistrarNome = document.getElementById('registrar__nome');
let inputCorrigirNome = document.getElementById('corrigir__nome');
inputRegistrarNome.addEventListener('input',ValidacaoNome)
inputCorrigirNome.addEventListener('input',ValidacaoNome)


//Mascaras nos Campos CPF
let inputRegistrarCpf = document.getElementById('registrar__cpf');
let inputCorrigirCpf = document.getElementById('corrigir__cpf');
inputRegistrarCpf.addEventListener('input', MascaraCpf);
inputCorrigirCpf.addEventListener('input', MascaraCpf);


//Mascaras nos Campos Telefone
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

function RecontagemLinhasTabela(){
    let cabecalhos = corpoTabela.getElementsByTagName('th')
    for(let i = 0; i < cabecalhos.length;i++){
        let count = i
        cabecalhos[i].textContent = ++count
    }
    contagemLinhas = corpoTabela.getElementsByTagName('tr').length;
}

function SelecionarLinha(){
    let oldSelectRow = document.querySelectorAll('.table-info')[0];
    if(oldSelectRow == undefined){
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
    let inputs = formulario.getElementsByTagName('input');
    for(let item of inputs){
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
    CriarCadastroStorage()
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
    CriarCadastroStorage()
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
    RecontagemLinhasTabela();
    CriarCadastroStorage()
    formRegistrar.classList.remove('esconder');
    formCorrigir.classList.add('esconder');
}

function ConverterTabelaObjeto(){
    let objTabela = {};
    let linha = corpoTabela.getElementsByTagName('tr');
    for(let i = 0; i < contagemLinhas;i++){
        objTabela[i] = ConverterLinhaArray(i);
    };
    console.log(objTabela);
    return objTabela;   
}


function ConverterLinhaArray(index){
    let arrayLinha = [];
    let linha = corpoTabela.getElementsByTagName('tr')[index];
    for(let j = 0; j < 4; j++){
        if(j == 0){
            arrayLinha.push(linha.getElementsByTagName('th')[j].textContent);
            arrayLinha.push(linha.getElementsByTagName('td')[j].textContent);
        }else{
            arrayLinha.push(linha.getElementsByTagName('td')[j].textContent);
        }
    };
    return arrayLinha;
}

function ConverterArrayLinha(array){
    let linhaArray = document.createElement('tr');
    linhaArray.classList.add('cadastro__row')
    for(let k = 0; k < array.length; k++){
        if(k == 0){
            let celulaCabecalho = document.createElement('th')
            celulaCabecalho.scope = "row"
            celulaCabecalho.textContent = array[k];
            linhaArray.id = array[k];
            linhaArray.appendChild(celulaCabecalho);
        }else{
            let celulaConteudo = document.createElement('td')
            celulaConteudo.textContent = array[k];
            linhaArray.appendChild(celulaConteudo);
        }
    }
    console.log(linhaArray);
    return linhaArray;
}

function CriarCadastroStorage(){
    let tabelaJSON = JSON.stringify(ConverterTabelaObjeto());
    localStorage.setItem('cadastro',tabelaJSON);
};

function RecarregarTabelaStorage(){
    let cadastrosJSON = localStorage.getItem('cadastro');
    let cadastrosObj = JSON.parse(cadastrosJSON);
    console.log(cadastrosObj);
    for(let cadastro in cadastrosObj){
        console.log(cadastrosObj[cadastro]);
        let linha = ConverterArrayLinha(cadastrosObj[cadastro]);
        corpoTabela.appendChild(linha)
    }
    RecontagemLinhasTabela()
}
