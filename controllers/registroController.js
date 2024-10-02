const express = require('express');
const router = express.Router();
const Inscripcion = require('../models/inscripcion');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/', async (req, res) => {
    const { nombre, email, mensaje, classes } = req.body; // Asegúrate de que el nombre del campo coincida con el formulario

    if (!classes) {
        return res.status(400).send('Las clases no están definidas.');
    }

    if (!Array.isArray(classes)) {
        return res.status(400).send('Las clases deben ser un array.');
    }

    if (classes.length > 3) {
        return res.status(400).send('No puedes seleccionar más de 3 clases.');
    }

    const nuevaInscripcion = new Inscripcion({ nombre, email, mensaje, classes });

    try {
        await nuevaInscripcion.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Registro Exitoso',
            text: `Hola ${nombre}, tu inscripción para las clases ${classes.join(', ')} ha sido exitosa.`
        };

        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: 'infoposadachoroni@gmail.com',
            subject: 'Nuevo Registro de Clase',
            text: `Nuevo registro:\nNombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}\nClases: ${classes.join(', ')}`
        };

        await transporter.sendMail(mailOptions);
        await transporter.sendMail(adminMailOptions);

        res.status(200).send('¡Gracias por su inscripción!');
    } catch (error) {
        res.status(500).send('Error al registrar usuario.');
    }
});

module.exports = router;
