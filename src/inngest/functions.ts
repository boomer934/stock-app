import nodemailer, { Transporter } from "nodemailer";
import { inngest } from "./client";
import { getAccessToken } from "@/../Oauth";
export const sendEmail = inngest.createFunction(
  { id: "send-email" },
  { event: "api/email.send-email" },
  async ({ event, step }: any) => {
    const { name, email } = event.data as { name: string; email: string };

    const requiredEnvVars = [
      "EMAIL",
      "CLIENT_ID",
      "CLIENT_SECRET",
      "REFRESH_TOKEN",
    ] as const;
    for (const varName of requiredEnvVars) {
      if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
      }
    }
    const accessToken = await getAccessToken();
    const transporter: Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken,
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

import yahooFinance from "yahoo-finance2";
import prisma from "../../prisma/singleton";
export const setAlert = inngest.createFunction(
  { id: "set-alert" },
  { cron: "TZ=Europe/Rome */2 * * * *" },
  async ({ step }) => {
    console.log("🚀 Inizio esecuzione funzione setAlert");

    const alerts = await prisma.alert.findMany({
      where: { isTriggered: false },
      include: { user: true },
    });
    console.log(`📊 Trovati ${alerts.length} alerts attivi da processare`);

    if (!alerts || alerts.length === 0) {
      console.log("❌ Nessun alert trovato, uscita");
      return { success: true };
    }

    for (const alert of alerts) {
      console.log(
        `🔍 Processando alert ${alert.id} per utente ${alert.user.email}`
      );
      const updated = await prisma.alert.updateMany({
        where: { id: alert.id, isTriggered: false },
        data: { isTriggered: true },
      });

      if (updated.count === 0) {
        console.log(`⏭️ Alert ${alert.id} già triggerato, salto`);
        continue;
      }
      try {
        console.log(`📈 Controllo prezzo per ${alert.name}`);

        // Ottieni il prezzo attuale dell'azione
        const quote = await yahooFinance.quote(alert.name);
        const currentPrice = quote.regularMarketPrice;

        console.log(
          `💰 Prezzo attuale di ${alert.name}: €${currentPrice}, Target: €${alert.target}`
        );

        // Controlla se il prezzo attuale è >= al target dell'alert
        if (currentPrice >= alert.target) {
          console.log(`🎯 TARGET RAGGIUNTO! Invio email per ${alert.name}`);

          // Verifica credenziali email
          const requiredEnvVars = [
            "EMAIL",
            "CLIENT_ID",
            "CLIENT_SECRET",
            "REFRESH_TOKEN",
          ];

          for (const varName of requiredEnvVars) {
            if (!process.env[varName]) {
              console.error(`❌ Variabile d'ambiente mancante: ${varName}`);
              throw new Error(
                `Missing required environment variable: ${varName}`
              );
            }
          }
          
          const accessToken = await getAccessToken();
          const transporter: Transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: process.env.EMAIL,
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
              accessToken,
            },
          });

          const mailOptions = {
            from: `"Trading Alerts" <${process.env.EMAIL}>`,
            to: alert.user.email,
            subject: `🎯 Alert Raggiunto: ${alert.name.toUpperCase()} ha superato il target!`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <div style="background: linear-gradient(135deg, #facc15 0%, #eab308 100%); padding: 30px; text-align: center;">
                    <h1 style="color: #1f2937; margin: 0; font-size: 28px; font-weight: 600;">🎯 Alert Attivato!</h1>
                    <p style="color: #374151; margin: 10px 0 0 0; font-size: 16px;">Il tuo obiettivo è stato raggiunto</p>
                  </div>

                  <div style="padding: 30px;">
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                      <h2 style="color: #111827; margin: 0 0 15px 0; font-size: 20px;">Dettagli dell'Alert</h2>
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 0; font-weight: 600; color: #6b7280; width: 120px;">Azione:</td>
                          <td style="padding: 8px 0; color: #111827; font-weight: 500;">${alert.name.toUpperCase()}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-weight: 600; color: #6b7280;">Target:</td>
                          <td style="padding: 8px 0; color: #111827; font-weight: 500;">€${alert.target.toFixed(
                            2
                          )}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-weight: 600; color: #6b7280;">Prezzo Attuale:</td>
                          <td style="padding: 8px 0; color: #059669; font-weight: 600; font-size: 18px;">€${currentPrice.toFixed(
                            2
                          )}</td>
                        </tr>
                      </table>
                    </div>

                    <div style="background-color: #fef3c7; border-left: 4px solid #eab308; padding: 15px; margin-bottom: 20px;">
                      <p style="margin: 0; color: #92400e; font-size: 16px;">
                        <strong>✅ Obiettivo Raggiunto!</strong><br>
                        Il prezzo di <strong>${alert.name.toUpperCase()}</strong> ha superato il tuo target di €${alert.target.toFixed(
              2
            )}.
                      </p>
                    </div>

                    ${
                      alert.description
                        ? `
                      <div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; margin-bottom: 20px;">
                        <h3 style="color: #dc2626; margin: 0 0 10px 0; font-size: 16px;">📝 Nota:</h3>
                        <p style="margin: 0; color: #1f2937; font-style: italic;">"${alert.description}"</p>
                      </div>
                    `
                        : ""
                    }

                    <div style="text-align: center; margin-top: 30px;">
                      <a href="${
                        process.env.NEXT_PUBLIC_APP_URL ||
                        "http://localhost:3000"
                      }/alerts"
                         style="background: linear-gradient(135deg, #facc15 0%, #eab308 100%); color: #1f2937; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                        Gestisci i tuoi Alerts
                      </a>
                    </div>

                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                      <p style="margin: 0; color: #6b7280; font-size: 14px;">
                        Hai ricevuto questa email perché hai impostato un alert per <strong>${alert.name.toUpperCase()}</strong>.<br>
                        Puoi modificare o eliminare questo alert dalla tua dashboard.
                      </p>
                    </div>
                  </div>

                  <div style="background-color: #1f2937; padding: 20px; text-align: center;">
                    <p style="margin: 0; color: #d1d5db; font-size: 12px;">
                      © 2024 Stock Alerts. Tutti i diritti riservati.
                    </p>
                  </div>
                </div>
              `,
          };

          console.log(
            `📧 Invio email a ${alert.user.email} per alert ${alert.name}`
          );

          await step.run(`send-alert-${alert.id}`, async () => {
            const info = await transporter.sendMail(mailOptions);
            console.log(
              `✅ Email inviata con successo a: ${alert.user.email}, ID messaggio: ${info.messageId}`
            );
            return { messageId: info.messageId };
          });

          console.log(`✅ Alert ${alert.id} processato con successo`);
        } else {
          console.log(`⏳ Target non ancora raggiunto per ${alert.name}`);
        }
      } catch (error) {
        console.error(
          `❌ Errore nel processamento dell'alert ${alert.id}:`,
          error
        );
        // Continua con il prossimo alert anche se uno fallisce
      }
    }

    console.log(`🏁 Fine esecuzione funzione setAlert`);
    return { success: true };
  }
);

export const sendVerifyEmail = inngest.createFunction(
  {id:"send-verify-email"},
  {event:"api/verify-email.send-email"},
  async ({event,step}) => {
    const {email,link} = event.data
    const accessToken = await getAccessToken();
    const transporter:Transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        type:"OAuth2",
        user:process.env.EMAIL,
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        refreshToken:process.env.REFRESH_TOKEN,
        accessToken,
      }
    })
    const mailOptions = {
      from:`"Trading Alerts" <${process.env.EMAIL}>`,
      to:email,
      subject:"Verifica email per Stock Alerts",
      html:`
      <h2>Verifica email per Stock Alerts</h2>
      <p>Per completare la registrazione, clicca sul link di verifica:</p>
      <a href=${link}>Verifica email</a>
      `
    }
    await step.run("send-verify-email",async () => {
      const info = await transporter.sendMail(mailOptions)
      console.log("Email inviata con successo a:",email,"ID messaggio:",info.messageId)
      return {messageId:info.messageId}
    })
    return {success:true}
  }
)