document.addEventListener("DOMContentLoaded", () => {
    const formFiltros = document.getElementById("formFiltros");
    const cardsHolder = document.querySelector(".cards-holder");
    const resultsWrapper = document.querySelector(".results-wrapper");

    // 1. Base de dados completa com as 5 coletas nos 5 postos com endereços e datas
    const bancoColetas = [
        // Posto Schueng LTDA - Centro (Posto só trabalha com Gasolina Comum e Gasolina Aditivada)
        { posto: "Posto Schueng LTDA", bairro: "Centro", endereco: "Rua Emilio Huller, 44, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "14/08/2026", preco: 6.39 },
        { posto: "Posto Schueng LTDA", bairro: "Centro", endereco: "Rua Emilio Huller, 44, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada Promocao", data: "14/08/2026", preco: 6.39 },
        { posto: "Posto Schueng LTDA", bairro: "Centro", endereco: "Rua Emilio Huller, 44, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "15/08/2026", preco: 6.39 },
        { posto: "Posto Schueng LTDA", bairro: "Centro", endereco: "Rua Emilio Huller, 44, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "15/08/2026", preco: 6.49 },
        { posto: "Posto Schueng LTDA", bairro: "Centro", endereco: "Rua Emilio Huller, 44, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "21/08/2026", preco: 6.39 },
        { posto: "Posto Schueng LTDA", bairro: "Centro", endereco: "Rua Emilio Huller, 44, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "21/08/2026", preco: 6.49 },
        { posto: "Posto Schueng LTDA", bairro: "Centro", endereco: "Rua Emilio Huller, 44, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "22/08/2026", preco: 6.39 },
        { posto: "Posto Schueng LTDA", bairro: "Centro", endereco: "Rua Emilio Huller, 44, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "22/08/2026", preco: 6.49 },
        { posto: "Posto Schueng LTDA", bairro: "Centro", endereco: "Rua Emilio Huller, 44, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "23/08/2026", preco: 6.39 },
        { posto: "Posto Schueng LTDA", bairro: "Centro", endereco: "Rua Emilio Huller, 44, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "23/08/2026", preco: 6.49 },

        // Posto Vista da Pedra LTDA - Rio Fundo
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "14/08/2026", preco: 6.49 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "14/08/2026", preco: 6.54 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Etanol", data: "14/08/2026", preco: 4.45 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "14/08/2026", preco: 6.69 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "15/08/2026", preco: 6.49 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "15/08/2026", preco: 6.54 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Etanol", data: "15/08/2026", preco: 4.45 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "15/08/2026", preco: 6.69 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "21/08/2026", preco: 6.49 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "21/08/2026", preco: 6.54 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Etanol", data: "21/08/2026", preco: 4.45 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "21/08/2026", preco: 6.69 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "22/08/2026", preco: 6.52 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "22/08/2026", preco: 6.59 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Etanol", data: "22/08/2026", preco: 4.49 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "22/08/2026", preco: 6.74 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "23/08/2026", preco: 6.52 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "23/08/2026", preco: 6.59 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Etanol", data: "23/08/2026", preco: 4.49 },
        { posto: "Posto Vista da Pedra LTDA", bairro: "Rio Fundo", endereco: "Rua Sit Braun, S/N, Rio Fundo, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "23/08/2026", preco: 6.74 },

        // Posto Vista Alegre LTDA - Centro
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "14/08/2026", preco: 6.73 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "14/08/2026", preco: 6.89 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Etanol", data: "14/08/2026", preco: 5.09 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "14/08/2026", preco: 7.29 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "15/08/2026", preco: 6.73 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "15/08/2026", preco: 6.89 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Etanol", data: "15/08/2026", preco: 5.09 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "15/08/2026", preco: 7.29 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "21/08/2026", preco: 6.73 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "21/08/2026", preco: 6.89 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Etanol", data: "21/08/2026", preco: 5.09 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "21/08/2026", preco: 7.29 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "22/08/2026", preco: 6.78 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "22/08/2026", preco: 6.94 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Etanol", data: "22/08/2026", preco: 5.13 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "22/08/2026", preco: 7.35 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "23/08/2026", preco: 6.78 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "23/08/2026", preco: 6.94 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Etanol", data: "23/08/2026", preco: 5.13 },
        { posto: "Posto Vista Alegre LTDA", bairro: "Centro", endereco: "Rod BR 262, km 48, Centro, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "23/08/2026", preco: 7.35 },

        // Posto Irmãos Venturini LTDA - Centro
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "14/08/2026", preco: 6.79 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "14/08/2026", preco: 6.99 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Etanol", data: "14/08/2026", preco: 5.10 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "14/08/2026", preco: 7.25 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "15/08/2026", preco: 6.79 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "15/08/2026", preco: 6.99 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Etanol", data: "15/08/2026", preco: 5.10 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "15/08/2026", preco: 7.25 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "21/08/2026", preco: 6.79 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "21/08/2026", preco: 6.99 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Etanol", data: "21/08/2026", preco: 5.10 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "21/08/2026", preco: 7.25 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "22/08/2026", preco: 6.79 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "22/08/2026", preco: 6.99 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Etanol", data: "22/08/2026", preco: 5.10 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "22/08/2026", preco: 7.25 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "23/08/2026", preco: 6.79 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "23/08/2026", preco: 6.99 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Etanol", data: "23/08/2026", preco: 5.10 },
        { posto: "Posto Irmãos Venturini LTDA", bairro: "Centro", endereco: "Rod BR 262, km 46, Centro, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "23/08/2026", preco: 7.25 },

        // Auto Posto Tesch LTDA - Centro (Não trabalha com Etanol)
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "14/08/2026", preco: 6.49 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "14/08/2026", preco: 6.55 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "14/08/2026", preco: 6.99 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "15/08/2026", preco: 6.49 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "15/08/2026", preco: 6.55 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "15/08/2026", preco: 6.99 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "21/08/2026", preco: 6.49 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "21/08/2026", preco: 6.55 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "21/08/2026", preco: 6.99 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "22/08/2026", preco: 6.49 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "22/08/2026", preco: 6.55 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "22/08/2026", preco: 6.99 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Gasolina Comum", data: "23/08/2026", preco: 6.49 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Gasolina Aditivada", data: "23/08/2026", preco: 6.55 },
        { posto: "Auto Posto tesch LTDA", bairro: "Vale das Palmas", endereco: "Rua Arthur Haese, 610, Vale das Palmas, Marechal Floriano, ES", combustivel: "Diesel S-10", data: "23/08/2026", preco: 6.99 },
    ];

    // Ouve o evento de submit do formulário para evitar recarregamento de página
    formFiltros.addEventListener("submit", (event) => {
        event.preventDefault();

        // Captura os filtros aplicados pelo usuário
        const filtroBairro = document.getElementById("bairro").value;
        const filtroCombustivel = document.getElementById("combustivel").value;
        const filtroPosto = document.getElementById("posto").value;
        const filtroPreco = document.getElementById("preco").value;

        // Processa os filtros lógicos (Tratando "Todos")
        let resultados = bancoColetas.filter(item => {
            const bateBairro = (filtroBairro === "Todos" || item.bairro === filtroBairro);
            const bateCombustivel = (filtroCombustivel === "Todos" || item.combustivel === filtroCombustivel);
            const batePosto = (filtroPosto === "Todos" || item.posto === filtroPosto);
            return bateBairro && bateCombustivel && batePosto;
        });

        // Ordenação opcional por preço
        if (filtroPreco === "Menor") {
            resultados.sort((a, b) => a.preco - b.preco);
        } else if (filtroPreco === "Maior") {
            resultados.sort((a, b) => b.preco - a.preco);
        }

        // Limpa a listagem anterior de cards
        cardsHolder.innerHTML = "";

        if (resultados.length === 0) {
            cardsHolder.innerHTML = `<div class="card-item"><h3>Nenhum resultado encontrado</h3><p class="card-address">Tente mudar seus filtros.</p></div>`;
            resultsWrapper.classList.remove("hidden");
            return;
        }

        // Renderiza os cards exatamente com as classes e tags solicitadas do seu CSS original
        resultados.forEach(item => {
            const card = document.createElement("div");
            card.className = "card-item";
            card.innerHTML = `
                <h3>${item.posto}</h3>
                <p class="card-address">${item.endereco}</p>
                <div class="card-details">
                    <span class="badge-fuel">${item.combustivel}</span>
                    <span class="badge-date">Coleta: ${item.data}</span>
                    <span class="badge-price">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                </div>
            `;
            cardsHolder.appendChild(card);
        });

        // Torna visível a área de resultados removendo a classe utility hidden
        resultsWrapper.classList.remove("hidden");
    });
});
