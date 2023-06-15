window.onload=exibirInteressados;

function exibirInteressados(){
    let espacoTabela = document.getElementById("tabela");
    fetch("http://localhost:3000/interessados", {method:"GET"})
    .then((response)=>{
        return response.json();
    })
    .then((dados)=>{
        if(dados.status == 200){
            let tabela = document.createElement('table');
            let cabecalho = document.createElement('thead');
            cabecalho.innerHTML=`<tr>
                                    <th>Nome</th>
                                    <th>Cpf</th>
                                    <th>Data Nascimento</th>
                                    <th>Email</th>
                                    <th>RG</th>
                                    <th>Interesse</th>
                                    <th>Ações</th>
                                 </tr>`
            tabela.appendChild(cabecalho);
            let body = document.createElement('tbody');
            for(const interessado of dados){
                const linha =`<tr>
                                <td>${dados.nome}</td>
                                <td>${dados.cpf}</td>
                                <td>${dados.dataNascimento}</td>
                                <td>${dados.email}</td>
                                <td>${dados.rg}</td>
                                <td>${dados.interesse}</td>
                              </tr>`
            }
        
        }else{
            espacoTabela.innerHTML="<p>NÃO EXISTEM DADOS A SEREM EXIBIDOS</p>"
        }
    })
    .catch((err)=>{
        espacoTabela.innerHTML="ERRO AO OBTER DADOS: " + err.message;
    })
}