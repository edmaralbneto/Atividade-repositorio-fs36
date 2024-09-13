// Token de autenticação (mantenha-o seguro e não exponha em produção)
const token = 'API_GIT_';

// Lista de usuários do GitHub para buscar as informações
const usernames = [
    'tiagolimar',
    'edmaralbneto',
    'JoaoRoberto1',
    'angelolustosa',
    'Gustavo1701',
    'miguelalves10',
    'antoniowgaldino',
    'breno-oliveira98',
    'rafaeoTW4',
    'Breno-arauj'
];

// Função para buscar informações de cada usuário e atualizar a tabela
async function atualizarTabela() {
    for (let i = 0; i < usernames.length; i++) {
        const username = usernames[i];
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`, {
                headers: {
                    'Authorization': `token ${token}` // Incluindo o token no cabeçalho
                }
            });
            const data = response.data;
            
            // Atualizando as células da tabela com as informações do usuário
            const row = document.querySelector(`#${username}`);
            if (row) {
                row.children[0].innerText = i + 1; // Número de ordem
                row.querySelector('.avatar').src = data.avatar_url;
                row.querySelector('.avatar').height = 35;
                row.querySelector('.avatar').width = 35;
                row.children[2].innerText = data.name || 'Não disponível';
                row.children[4].innerText = data.public_repos;
            }
        } catch (error) {
            console.error('Erro ao buscar informações de ' + username + ': ' + error.message);
            // Opcional: mostrar uma mensagem de erro na tabela ou em outro local
        }
    }
}

// Atualizar a tabela quando o script for carregado
atualizarTabela();
