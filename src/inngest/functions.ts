import nodemailer, { Transporter } from "nodemailer";
import { inngest } from "./client";
export const sendEmail = inngest.createFunction(
  { id: "send-email" },
  { event: "api/email.send-email" },
  async ({ event, step }: any) => {
    const { name, email } = event.data as { name: string; email: string };
    const transporter: Transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
          },
        });
    const mailOptions = {
        from: `"Trading Alerts" <${process.env.EMAIL}>`,
        to: email,
        subject: "Benvenuto nel tuo portale di Trading Alerts! 🚀",
        html: `
        <h2>Ciao ${name}, benvenuto su Stock Alerts!</h2>
          <p>Siamo felici che ti sia iscritto al nostro sito di trading. 🎉</p>
          <p>Con Stock Alerts potrai:</p>
          <ul>
            <li>Creare alert personalizzati sui tuoi asset preferiti</li>
            <li>Ricevere notifiche immediate quando raggiungi i livelli che ti interessano</li>
            <li>Monitorare il mercato senza effettuare operazioni di buy/sell direttamente dal portale</li>
          </ul>
          <p>Inizia subito a impostare i tuoi alert e resta sempre aggiornato!</p>
          <p>Buon trading,<br><strong>Il team di Stock Alerts</strong></p>
        `,
      };
    await step.run("send-email", async () => {
      const info = await transporter.sendMail(mailOptions);
      console.log(
        "Email inviata con successo a:",
        email,
        "ID messaggio:",
        info.messageId
      );
      return { messageId: info.messageId };
    });

    return { success: true } as const;
  }
);
