import nodemailer from "nodemailer";

// Set up transporter using Brevo's SMTP settings
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: "829d54004@smtp-brevo.com",
        pass: "xsmtpsib-f863621edfa416b8a9d621e20c1acf8a91a48961b0df3c5aaa952fa861a12879-rvK94gp7s2PUtX0C",
    },
    
});

export default transporter;