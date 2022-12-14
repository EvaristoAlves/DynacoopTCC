'use strict';
if (typeof (Cep) == "undefined") { Cep= {} }
if (typeof (Cep.Account) == "undefined") { Cep.Account = {} }

Cep.Account = {
    OnLoad: function (executionContext) {
        var formContext = executionContext.getFormContext();
        const limparFormulario = (endereco) => {
            document.getElementById('endereco').value = '';
            document.getElementById('complemento').value = '';
            document.getElementById('bairro').value = '';
            document.getElementById('cidade').value = '';
            document.getElementById('estado').value = '';
            document.getElementById('codigoibge').value = '';
            document.getElementById('ddd').value = '';
        }


        const preencherFormulario = (endereco) => {
            document.getElementById('endereco').value = endereco.logradouro;
            document.getElementById('complemento').value = endereco.complemento;
            document.getElementById('bairro').value = endereco.bairro;
            document.getElementById('cidade').value = endereco.localidade;
            document.getElementById('estado').value = endereco.uf;
            document.getElementById('codigoibge').value = endereco.ibge;
            document.getElementById('ddd').value = endereco.ddd;

        }


        const eNumero = (numero) => /^[0-9]+$/.test(numero);

        const cepValido = (cep) => cep.length == 8 && eNumero(cep);

        const pesquisarCep = async () => {
            limparFormulario();

            const cep = document.getElementById('cep').value.replace("-", "");
            const url = `https://viacep.com.br/ws/${cep}/json/`;
            if (cepValido(cep)) {
                const dados = await fetch(url);
                const endereco = await dados.json();
                if (endereco.hasOwnProperty('erro')) {
                    document.getElementById('endereco').value = 'CEP não encontrado!';
                } else {
                    preencherFormulario(endereco);
                }
            } else {
                document.getElementById('endereco').value = 'CEP incorreto!';
            }

        }

        document.getElementById('cep')
            .addEventListener('focusout', pesquisarCep);
    }
}
