const nodemailer = require('nodemailer');
const respReturn = require('../Shared/response')

exports.SendEmail = (req, res) => {
    const { to, subject, text } = req.body;


    // Replace with your email configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amirj9514@gmail.com',
            pass: 'pojbwvlqpmwmgxkc',
        },
    });

    const mailOptions = {
        from: 'amirj9514@gmail.com',
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json(respReturn(false, false, "Error sending Mail"));
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json(respReturn(true, false, 'Email sent successfully'));
        }
    });
}
