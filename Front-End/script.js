/************************************* 
 *             Dark-mode             *
 *************************************/

document.addEventListener('DOMContentLoaded', (event) => {
    const themeSwitch = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    if (currentTheme) {
        document.documentElement.classList.toggle('dark-mode', currentTheme === 'dark');
        themeSwitch.checked = currentTheme === 'dark';
    }

    themeSwitch.addEventListener('change', function () {
        document.documentElement.classList.toggle('dark-mode', this.checked);
        localStorage.setItem('theme', this.checked ? 'dark' : 'light');
    });
});


/************************************* 
 *          Barra de Busca           *
 *************************************/

/* ---- Categoria ---- */

let categoriaAtual = 'Nome';

document.addEventListener('DOMContentLoaded', () => {
    setCategoria(categoriaAtual);
});

document.querySelectorAll('.search-bar__dropdown-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', function () {
        setCategoria(this.textContent);
    });
});

function setCategoria(categoria) {
    categoriaAtual = categoria;
    document.getElementById('categoriaSelecionada').textContent = categoria;
}

/* ---- Busca ---- */

document.querySelector('.search-bar__button').addEventListener('click', filtrarLeads);

function normalizarTexto(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filtrarLeads() {
    const textoDeBusca = document.querySelector('.search-bar__input').value.toLowerCase();
    const categoria = categoriaAtual;

    leads = leads.filter(lead => {
        switch (categoria) {
            case 'Nome':
                return normalizarTexto(lead.nome).includes(textoDeBusca);;
            case 'CPF':
                return lead.cpf.includes(textoDeBusca);;
            case 'Nascimento':
                return lead.data_nascimento.includes(textoDeBusca);;
            case 'Telefone':
                return lead.telefone.includes(textoDeBusca);;
            case 'Email':
                return lead.email.toLowerCase().includes(textoDeBusca);;
            case 'CEP':
                return lead.endereco.cep.includes(textoDeBusca);;
            case 'Logradouro':
                return normalizarTexto(lead.endereco.logradouro).includes(textoDeBusca);;
            case 'Bairro':
                return normalizarTexto(lead.endereco.bairro).includes(textoDeBusca);;
            case 'Cidade':
                return normalizarTexto(lead.endereco.cidade).includes(textoDeBusca);;
            case 'Estado':
                return normalizarTexto(lead.endereco.estado).includes(textoDeBusca);;
            default:
                return normalizarTexto(lead.nome).includes(textoDeBusca);;
        }
    })

    atualizarListaDeLeads(leads);
    document.getElementById('botaoRestaurar').style.display = 'block';
}

function restaurarLista() {
    carregarListaDeLeads();

    document.getElementById('leadsFilter').value = '';
    document.getElementById('botaoRestaurar').style.display = 'none';
}

/************************************* 
 *               LEADS               *
 *************************************/

var leads;
const LEADS_POR_PAGINA = 10;

document.addEventListener('DOMContentLoaded', () => {
    carregarListaDeLeads();
});

function carregarListaDeLeads() {
    fetch('http://127.0.0.1:8000/api/Cliente/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            leads = data;
            atualizarListaDeLeads(leads);
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
}

function irParaPagina(numPagina) {
    atualizarListaDeLeads(leads, numPagina);
}

function atualizarListaDeLeads(leadsParaExibir, paginaAtual = 1) {
    const inicio = (paginaAtual - 1) * LEADS_POR_PAGINA;
    const fim = inicio + LEADS_POR_PAGINA;
    const leadsPaginados = leadsParaExibir.slice(inicio, fim);

    const lista = document.querySelector('.list-group');
    lista.innerHTML = ''; // Limpa a lista atual

    leadsPaginados.forEach(lead => {
        const leadHTML = `
            <a href="#" class="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#infoModal" data-lead-id="${lead.cpf}" onclick="preencherModalComLead(${lead.cpf})">
                <div class="row">
                    <div class="col-md-4">
                        <div>${lead.nome}</div>
                        <small>${formatarCPF(lead.cpf)} - ${lead.data_nascimento}</small>
                    </div>
                    <div class="col-md-4">
                        <div class="contact-info"><i class="bi-telephone"></i> ${formatarTelefone(lead.telefone)}</div>
                        <div class="contact-info"><i class="bi-envelope"></i> ${lead.email}</div>
                    </div>
                    <div class="col-md-4">
                        ${lead.endereco.logradouro}, ${lead.endereco.complemento ? lead.endereco.complemento + ', ' : ''}${lead.endereco.bairro}, ${lead.endereco.cidade} - ${lead.endereco.estado}, ${formatarCEP(lead.endereco.cep)}
                    </div>
                </div>
            </a>
        `;

        lista.innerHTML += leadHTML; // Adiciona o HTML do lead à lista
    });

    criarPaginacao(leadsParaExibir.length, paginaAtual);
}

function criarPaginacao(length, paginaAtual = 1) {
    const paginas = document.querySelector('.pagination');
    paginas.innerHTML = '';

    const numeroDePaginas = Math.ceil(length / LEADS_POR_PAGINA);
    const PAGINAS_VISIVEIS = 2;

    // Voltar
    if (paginaAtual > 1) {
        paginas.innerHTML += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="irParaPagina(${paginaAtual - 1})">&laquo;</a>
            </li>
        `;
    }

    // Primeira página
    if (paginaAtual > PAGINAS_VISIVEIS + 1) {
        paginas.innerHTML += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="irParaPagina(1)">1</a>
            </li>
            <li class="page-item"><span class="page-link disabled">...</span></li>
        `;
    }

    // Páginas intermediárias
    for (let i = Math.max(1, paginaAtual - PAGINAS_VISIVEIS); i <= Math.min(numeroDePaginas, paginaAtual + PAGINAS_VISIVEIS); i++) {
        paginas.innerHTML += `
            <li class="page-item">
                <a class="page-link ${i === paginaAtual ? 'active' : ''}" href="#" onclick="irParaPagina(${i})">${i}</a>
            </li>
        `;
    }

    // Última página
    if (paginaAtual < numeroDePaginas - PAGINAS_VISIVEIS) {
        paginas.innerHTML += `
            <li class="page-item"><span class="page-link disabled">...</span></li>
            <li class="page-item">
                <a class="page-link" href="#" onclick="irParaPagina(${numeroDePaginas})">${numeroDePaginas}</a>
            </li>
        `;
    }

    // Avançar
    if (paginaAtual < numeroDePaginas) {
        paginas.innerHTML += `
            <li class="page-item">
                <a class="page-link ${paginaAtual === numeroDePaginas ? 'disabled' : ''}" href="#" onclick="irParaPagina(${paginaAtual + 1})">&raquo;</a>
            </li>
        `;
    }
}

const leadVazio = {
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    data_nascimento: "",
    endereco: {
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
    }
};

/************************************* 
 *               MODAL               *
 *************************************/

let leadAtualCPF = null;
const deleteButton = document.getElementById('deleteButton');
const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
const infoModalElement = document.getElementById('infoModal');

function preencherModalComLead(cpf = 0) {
    leadAtualCPF = cpf;

    // Verifica se o CPF é válido antes de fazer o fetch
    if (cpf !== 0) {
        fetch(`http://127.0.0.1:8000/api/Cliente/${cpf}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(leadSelecionado => {
                preencherCamposDoModal(leadSelecionado);
            })
            .catch(error => {
                console.error('Erro ao buscar lead:', error);
            });
    } else {
        preencherCamposDoModal(leadVazio);
    }
}

function preencherCamposDoModal(leadSelecionado) {
    document.getElementById('lead-nome').value = leadSelecionado.nome;
    document.getElementById('lead-cpf').value = formatarCPF(leadSelecionado.cpf);
    document.getElementById('lead-email').value = leadSelecionado.email;
    document.getElementById('lead-telefone').value = formatarTelefone(leadSelecionado.telefone);
    document.getElementById('lead-nascimento').value = leadSelecionado.data_nascimento;

    document.getElementById('endereco-cep').value = formatarCEP(leadSelecionado.endereco.cep);
    document.getElementById('endereco-logradouro').value = leadSelecionado.endereco.logradouro;
    document.getElementById('endereco-complemento').value = leadSelecionado.endereco.complemento;
    document.getElementById('endereco-bairro').value = leadSelecionado.endereco.bairro;
    document.getElementById('endereco-cidade').value = leadSelecionado.endereco.cidade;
    document.getElementById('endereco-estado').value = leadSelecionado.endereco.estado;

    const inputCpf = document.getElementById('lead-cpf');
    const deleteButton = document.getElementById('deleteButton');

    if (leadSelecionado.cpf != 0) {
        inputCpf.disabled = true;
        deleteButton.classList.remove('hidden-button');
    } else {
        inputCpf.disabled = false;
        deleteButton.classList.add('hidden-button');
    }
}


infoModalElement.addEventListener('hidden.bs.modal', function () {
    campos.forEach(campo => {
        campo.e.classList.remove('invalid');
        campo.e.classList.add('valid');
    });
});

/* ---- Formatadores e Auto-Complete ---- */

function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '').slice(0, 11);
    cpf = cpf.replace(/(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/, function (match, p1, p2, p3, p4) {
        return p1 + (p2 ? '.' + p2 : '') + (p3 ? '.' + p3 : '') + (p4 ? '-' + p4 : '');
    });
    return cpf;
}

function formatarCEP(cep) {
    cep = cep.replace(/\D/g, '').slice(0, 8);

    return cep.replace(/(\d{5})(\d{1,3})/, function (match, p1, p2) {
        return p1 + '-' + p2;
    });
}

function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '').slice(0, 11);

    return telefone.replace(/(\d{2})(\d{1})?(\d{0,4})?(\d{0,4})?/, function (_, p1, p2, p3, p4) {
        return '(' + p1 + (p2 ? ') ' + p2 : '') + (p3 ? ' ' + p3 : '') + (p4 ? '-' + p4 : '');
    });
}

document.getElementById('lead-nascimento').addEventListener('focus', function () {
    this.type = 'date';
    this.focus();
});

document.getElementById('lead-nascimento').addEventListener('blur', function () {
    if (this.value) {
        const dataFormatada = this.value;
        this.type = 'text';
        this.value = dataFormatada;
    } else {
        this.type = 'text';
    }
});

function formatarCampo(campo, formatarFuncao) {
    campo.addEventListener('input', function () {
        const valorFormatado = formatarFuncao(this.value);
        this.value = valorFormatado;
    });
}

formatarCampo(document.getElementById('lead-cpf'), formatarCPF);
formatarCampo(document.getElementById('lead-telefone'), formatarTelefone);
formatarCampo(document.getElementById('endereco-cep'), formatarCEP);

document.getElementById('endereco-cep').addEventListener('blur', function () {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        buscarEndereco(cep);
    }
});

function buscarEndereco(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById('endereco-logradouro').value = data.logradouro;
                document.getElementById('endereco-bairro').value = data.bairro;
                document.getElementById('endereco-cidade').value = data.localidade;
                document.getElementById('endereco-estado').value = data.uf;
            } else {
                // Lidar com CEP não encontrado
                alert("CEP não encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro na busca do CEP:", error);
        });
}

/* ---- Validação de campos ---- */

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

const getElement = value => document.getElementById(value);
const campos = [
    { e: getElement('lead-cpf'), fn: validarCPF },
    { e: getElement('endereco-cep'), fn: (s) => /^[0-9]{8}$/.test(s.replace(/\D/g, '')) },
    { e: getElement('lead-nome'), fn: (s) => /^[a-zA-ZáàâãÁÀÂÃéèêÉÈÊíïÍÏóôõöÓÔÕÖúç\s']{1,40}$/.test(s.trim()) },
    { e: getElement('lead-email'), fn: (s) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(s) },
    { e: getElement('lead-telefone'), fn: (s) => /^[1-9]\d{10}$/.test(s.replace(/\D/g, '')) },
    { e: getElement('lead-nascimento'), fn: (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) },
    { e: getElement('endereco-logradouro'), fn: (s) => /^.{1,80}$/.test(s.trim()) },
    { e: getElement('endereco-complemento'), fn: (s) => s.trim().length <= 20 },
    { e: getElement('endereco-bairro'), fn: (s) => /^.{1,29}$/.test(s.trim()) },
    { e: getElement('endereco-cidade'), fn: (s) => /^.{1,29}$/.test(s.trim()) },
    { e: getElement('endereco-estado'), fn: (s) => /^.{2}$/.test(s.trim()) }
];

campos.forEach((campo) => {
    campo.e.addEventListener('blur', () => {
        if (campo.fn(campo.e.value)) {
            campo.e.classList.add('valid');
            campo.e.classList.remove('invalid');
            console.log("valido");
        } else {
            campo.e.classList.add('invalid');
            campo.e.classList.remove('valid');
            console.log("invalido");
        }
    });
});


document.getElementById('salvar').addEventListener('click', () => {
    let todosCamposValidos = true;

    campos.forEach((campo) => {
        if (campo.fn(campo.e.value)) {
            campo.e.classList.remove('invalid');
            campo.e.classList.add('valid');
        } else {
            campo.e.classList.add('invalid');
            campo.e.classList.remove('valid');
            todosCamposValidos = false;
        }
    });

    if (!todosCamposValidos) {
        return;
    }

    const lead = obterDadosDoFormulario();

    if (leadAtualCPF == 0) {
        criarLead(lead);
    } else {
        atualizarLead(lead);
    }
});

function obterDadosDoFormulario() {
    let lead = {
        endereco: {}
    };

    return {
        nome: getElement('lead-nome').value.trim(),
        cpf: getElement('lead-cpf').value.replace(/\D/g, ''),
        email: getElement('lead-email').value.trim(),
        telefone: getElement('lead-telefone').value.replace(/\D/g, ''),
        data_nascimento: getElement('lead-nascimento').value,
        endereco: {
            cep: getElement('endereco-cep').value.replace(/\D/g, ''),
            logradouro: getElement('endereco-logradouro').value.trim(),
            complemento: getElement('endereco-complemento').value.trim(),
            bairro: getElement('endereco-bairro').value.trim(),
            cidade: getElement('endereco-cidade').value.trim(),
            estado: getElement('endereco-estado').value.trim(),
        }
    };
}

function criarLead(novoLead) {
    fetch('http://127.0.0.1:8000/api/Cliente/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoLead)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            carregarListaDeLeads();
            infoModal.hide();
        })
        .catch(error => {
            alert('Erro ao criar lead:', error);
        });
}

function atualizarLead(leadAtualizado) {
    fetch(`http://127.0.0.1:8000/api/Cliente/${leadAtualizado.cpf}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadAtualizado)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            carregarListaDeLeads();
            infoModal.hide();
        })
        .catch(error => {
            alert('Erro ao atualizar lead:', error);
        });
}

deleteButton.addEventListener('click', () => {
    if (!leadAtualCPF) {
        alert('Nenhum lead selecionado para exclusão.');
        return;
    }

    const confirmacao = confirm('Você tem certeza que deseja excluir este lead?');
    if (!confirmacao) {
        return;
    }

    fetch(`http://127.0.0.1:8000/api/Cliente/${leadAtualCPF}/`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    })
    .then(() => {
        carregarListaDeLeads();
        infoModal.hide();
    })
    .catch(error => {
        alert('Erro ao excluir lead:', error);
    });
});
