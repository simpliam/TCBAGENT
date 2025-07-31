// gateway/whatsapp.js – Estrutura futura para WhatsApp
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/whatsapp', async (req, res) => {
  const { message, sender } = req.body;
  try {
    const resposta = await axios.post('http://localhost:3000/chat', { pergunta: message });
    const reply = resposta.data.resposta;
    console.log(`Responder para ${sender}: ${reply}`);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao processar mensagem WhatsApp:', error);
    res.sendStatus(500);
  }
});

app.listen(4000, () => {
  console.log('Gateway WhatsApp disponível na porta 4000');
});
