const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(cors());
app.use(express.json());


sgMail.setApiKey(process.env.SENDGRID_KEY);

app.post('/enviar-correo', async (req, res) => {
  const { asunto, mensaje, destinatarios } = req.body;

  const msg = {
    to: destinatarios,
    from: 'ricardo541919@hotmail.com', // debe estar verificado en SendGrid
    subject: asunto,
    text: mensaje
  };

  try {
    await sgMail.sendMultiple(msg);
    res.status(200).send('Correo enviado');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error al enviar correo');
  }
});

app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));
