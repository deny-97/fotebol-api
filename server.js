const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;

app.get('/jogos-hoje', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await axios.get(\`https://v3.football.api-sports.io/fixtures?date=\${today}\`, {
      headers: { 'x-apisports-key': API_KEY }
    });
    const jogos = response.data.response.map(j => ({
      liga: j.league.name,
      hora: j.fixture.date,
      mandante: j.teams.home.name,
      visitante: j.teams.away.name
    }));
    res.json(jogos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar dados da API-Football', detalhes: error.message });
  }
});

app.listen(PORT, () => {
  console.log(\`Servidor rodando na porta \${PORT}\`);
});