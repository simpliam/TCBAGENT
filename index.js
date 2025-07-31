// index.js – Backend principal do agente TCB
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const faqs = require('./dados/faqs.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/chat', (req, res) => {
  const pergunta = req.body.pergunta?.toLowerCase() || '';
  const resposta = faqs.find(f => pergunta.includes(f.pergunta.toLowerCase()));
  if (resposta) {
    res.json({ resposta: resposta.resposta });
  } else {
    res.json({ resposta: 'Desculpa, não encontrei uma resposta clara. Podes reformular?' });
  }
});

app.listen(port, () => {
  console.log(`Agente TCB disponível em http://localhost:${port}`);
});
