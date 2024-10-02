const express = require('express');
const router = express.Router();
const Mensaje = require('../models/mensaje');
const nodemailer = require('nodemailer');

// Configuración del transporte de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/', async (req, res) => {
    const { nombre, correo, telefono, mensaje } = req.body;

    const nuevoMensaje = new Mensaje({
        nombre,
        correo,
        telefono,
        mensaje
    });

    try {
        await nuevoMensaje.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'infoposadachoroni@gmail.com',
            subject: 'Nuevo mensaje de contacto',
            text: `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`
        };

        await transporter.sendMail(mailOptions);

        const autoReplyOptions = {
            from: process.env.EMAIL_USER,
            to: correo,
            subject: 'Gracias por contactarnos',
            text: 'Hemos recibido tu mensaje y te responderemos lo antes posible. ¡Gracias por contactarnos!'
        };

        await transporter.sendMail(autoReplyOptions);

        res.status(200).send('Mensaje recibido y guardado');
    } catch (error) {
        res.status(500).send('Error al procesar el mensaje');
    }
});

module.exports = router;
