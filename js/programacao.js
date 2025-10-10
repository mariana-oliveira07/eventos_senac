const SUPABASE_URL = "https://buqyqagehprmnlvbhbpd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cXlxYWdlaHBybW5sdmJoYnBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMzEyMDksImV4cCI6MjA3NTYwNzIwOX0.FbFUIBkHC1EWEuWReSLfa9jj6PiRVEXuc64pY96vP6c";
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Função para carregar eventos do Supabase e exibi-los na página
async function carregarEventos() {
    const container = document.getElementById("cards-container");
    container.innerHTML = "<p>Carregando eventos...</p>";

    try {
        // Buscar eventos do Supabase
        const { data, error } = await client
            .from("tbatividades")
            .select("*")
            .order("data", { ascending: false });

        if (error) throw error;

        // Se não houver eventos // Os três sinais de igualdade comparam valor e tipo
        if (!data || data.length === 0) {
            container.innerHTML = "<p>Nenhum evento encontrado.</p>";
            return;
        }
        const hoje = new Date();

        // Montar os cards dos eventos
        container.innerHTML = data
            .map((evento) => {
                const tipoClasse = evento.tipo?.toLowerCase().replace(/\s+/g, "-") || "evento";
                const dataEvento = new Date(evento.data);
                const dataFormatada = new Date(evento.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                });

                const eventoPassado = dataEvento < hoje;

                const botao = eventoPassado
                    ? '<button class="btn-inscrever disabled" disabled>Encerrado </button>'
                    : `<a href="inscricao.html?id=${evento.id}" class="btn-inscrever">Inscreva-se</a>`;

                return `
                <div class=" card ${eventoPassado ? "evento-passado" : ""}">
                    <span class="badge ${tipoClasse}">${evento.tipo}</span>
                    <h3>${evento.titulo}</h3>
                    <p><strong>Data:</strong> ${dataFormatada} ° <strong>Hora:</strong> ${evento.hora}</p>
                    <p><strong>Palestrante:</strong> ${evento.palestrante}</p>
                    <p><strong>Local:</strong> ${evento.local || "A definir"}</p>
                    ${botao}
                </div>
                `;
            })
            .join("");
    } catch (err) {
        console.error("Erro ao carregar eventos:", err.message);
        container.innerHTML = "<p>Erro ao carregar eventos. Tente novamente mais tarde.</p>";
    }
}

document.addEventListener("DOMContentLoaded", carregarEventos);