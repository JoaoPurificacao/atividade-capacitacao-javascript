function garantia(){
    let buttons = document.querySelectorAll('.btn')
    for(let item of buttons){
        item.addEventListener('click', prevencao);
    }
}


function prevencao(e){
    e.preventDefault()
};

window.onload = garantia()

/*
    Explicando esse script

    Como está com Bootstrap, ao clicar nos botões, a página recarrega, então para previnir que a página faça isso, coloquei para que todos os botões, ao serem clicados não reiniciem a página.

    Assim vocês podem fazer todas alterações sem perder dados os dados no console.

*/