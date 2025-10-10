const SUPABASE_URL = "https://buqyqagehprmnlvbhbpd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cXlxYWdlaHBybW5sdmJoYnBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMzEyMDksImV4cCI6MjA3NTYwNzIwOX0.FbFUIBkHC1EWEuWReSLfa9jj6PiRVEXuc64pY96vP6c";
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const selectAtividade = document.getElementById("atividade");
const form = document.getElementById("formInscricao");

// Função para carregar eventos do Supabase e exibi-los na página
async function carregarAtividades() {
        // Buscar eventos do Supabase
        const { data, error } = await client
            .from("tbatividades")
            .select("id, titulo, data")
            .order("data", { ascending: true });

        if (error) {
            console.error("Erro ao buscar atividades:", error.message);
            selectAtividade.innerHTML = '<option value="">Erro ao carregar atividades</option>';
            return;
        }

        const hoje = new Date();
        const atividadesFuturas = data.filter(ev => new Date(ev.data) >= hoje);

        if (atividadesFuturas.length === 0) {
            selectAtividade.innerHTML = '<option value="">Nenhuma atividade disponível</option>';
            return;
        }

        selectAtividade.innerHTML = '<option value="">Selecione uma atividade</option>'
        atividadesFuturas.forEach(ev => {
            const opcao = document.createElement("option");
            const dataFormatada = new Date(ev.data).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
            });
            opcao.value = ev.id;
            opcao.textContent = `${ev.titulo} - ${dataFormatada}`;
            selectAtividade.appendChild(opcao);    
        });

        const params = new URLSearchParams(window.location.search);
        const eventoId = params.get("id");
        if (eventoId) selectAtividade.value = eventoId; 
}

    async function salvarInscricao(nome, email, atividade_id) {
        const { data: jaExiste, error: erroBusca } = await client
            .from("tbinscricoes")
            .select("*")
            .eq("email", email)
            .eq("idativiade", atividade_id);

        if (erroBusca) {
            console.error("Erro ao verificar inscrição existente:", erroBusca.message);
            alert("Ocorreu um erro ao verificar sua inscrição. Tente novamente.");
            return false;
        }

        if (jaExiste.length > 0) {
            alert("Você já está inscrito nesta atividade.");
            return false;
        }
    
        const { error } = await client.from("tbinscricoes").insert([
            { nome, email, idativiade: atividade_id }
        ]);

        if (error) {
            console.error("Erro ao salvar inscrição:", error.message);
            alert("Ocorreu um erro ao salvar sua inscrição. Tente novamente.");
            return false;
        }

        return true;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const atividade_id = selectAtividade.value;

        if (!atividade_id) {
            alert("Por favor, selecione uma atividade.");
            return;
        }

        const sucesso = await salvarInscricao(nome, email, atividade_id);
        if (sucesso) {
            alert(`Inscrição realizada com sucesso!\nNome: ${nome}\nEmail: ${email}`);
            form.reset();
        }
    });

    carregarAtividades();

document.getElementById("formInscricao").addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const atividadeId = selectAtividade.value;

    if (!atividadeId) {
        alert("Por favor, selecione uma atividade.");
        return;
    }

    alert(`Inscrição realizada com sucesso!\nNome: ${nome}\nEmail: ${email}`);

});