const SUPABASE_URL = "https://nahxbuzzmatdzrqaacrf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5haHhidXp6bWF0ZHpycWFhY3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NDE4NTQsImV4cCI6MjA3NTAxNzg1NH0.wMiiiZZ3ZWxRy_RD_bRjHU4ck9tFpi1Ey8CPwFG18tQ";
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Função para carregar eventos do Supabase e exibi-los na página
async function carregarEventos() {
    const container = document.getElementById("eventos-container");
    container.innerHTML = "<p>Carregando eventos...</p>";

    try {
        // Buscar eventos do Supabase
        const { data: eventos, error } = await client
            .from("tbatividades")
            .select("*")
            .order("data", { ascending: false });

        if (error) throw error;

        // Se não houver eventos // Os três sinais de igualdade comparam valor e tipo
        if (!data || data.length === 0) {
            container.innerHTML = "<p>Nenhum evento encontrado.</p>";
            return;
        }
        console.log(eventos);

        // Montar os cards dos eventos
        container.innerHTML = data
            .map((evento) => {
                const tipoClasse = evento.tipo?.toLowerCase() || "evento";
                const dataFormatada = new Date(evento.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });

                return `
                <div class="card">
                    <span class="badge ${tipoClasse}">${evento.tipo}</span>
                    <h3>${evento.titulo}</h3>
                    <p><strong>Data:</strong> ${dataFormatada} ° <strong>Hora:</strong> ${evento.hora}</p>
                    <p><strong>Palestrante:</strong> ${evento.palestrante}</p>
                    <br>
                    <a href="inscricao.html?id=${evento.id}" class="btn">Inscreva-se</a>
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