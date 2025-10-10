import nodemailer, { Transporter } from "nodemailer";
import { inngest } from "./client";
import { getAccessToken } from "../../Oauth";
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
      subject: "Welcome to your Trading Alerts portal! 🚀",
      html: `
        <h2>Hello ${name}, welcome to Stock Alerts!</h2>
          <p>We're thrilled that you've joined our trading site. 🎉</p>
          <p>With Stock Alerts you can:</p>
          <ul>
            <li>Create personalized alerts on your favorite assets</li>
            <li>Receive immediate notifications when you reach the levels that interest you</li>
            <li>Monitor the market without making buy/sell operations directly from the portal</li>
          </ul>
          <p>Start setting up your alerts right away and stay always updated!</p>
          <p>Happy trading,<br><strong>The Stock Alerts team</strong></p>
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
                      © 2025 Stock Alerts. Tutti i diritti riservati.
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
  { id: "send-verify-email" },
  { event: "api/verify-email.send-email" },
  async ({ event, step }) => {
    const { email, link } = event.data;
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
    const isProduction = process.env.NODE_ENV === "production";
    const baseUrl = isProduction
      ? process.env.NEXT_PUBLIC_BASE_URL // es: https://tuosito.com
      : "http://localhost:3000";

    const logoUrl = `${baseUrl}/logo-nobg.png`;
    const mailOptions = {
      from: `"Trading Alerts" <${process.env.EMAIL}>`,
      to: email,
      subject: "Verifica email per Stock Alerts",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Email - Stock Alerts</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    margin: 0;
                    padding: 0;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    color: #e2e8f0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                }
                .header {
                    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
                    padding: 40px 20px;
                    text-align: center;
                    position: relative;
                }
                .header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="10" cy="60" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="90" cy="30" r="1" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
                    opacity: 0.3;
                }
                .title {
                    font-size: 28px;
                    font-weight: 700;
                    margin: 0 0 10px 0;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }
                .subtitle {
                    font-size: 16px;
                    opacity: 0.9;
                    margin: 0;
                }
                .content {
                    padding: 40px 30px;
                    text-align: center;
                }
                .welcome-text {
                    font-size: 18px;
                    color: #f1f5f9;
                    margin-bottom: 30px;
                    line-height: 1.6;
                }
                .verification-button {
                    display: inline-block;
                    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
                    color: white;
                    padding: 16px 32px;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                    border-radius: 12px;
                    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                    margin: 20px 0;
                }
                .verification-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 25px rgba(16, 185, 129, 0.4);
                }
                .note {
                    font-size: 14px;
                    color: #94a3b8;
                    margin-top: 30px;
                    line-height: 1.5;
                }
                .footer {
                    background: rgba(0, 0, 0, 0.2);
                    padding: 20px;
                    text-align: center;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                .footer-text {
                    font-size: 12px;
                    color: #cbd5e1;
                    margin: 0;
                }
                @media (max-width: 600px) {
                    .container {
                        margin: 10px;
                        border-radius: 15px;
                    }
                    .header, .content {
                        padding: 30px 20px;
                    }
                    .title {
                        font-size: 24px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 class="title">Stock Alerts</h1>
                    <p class="subtitle">Professional Trading Platform</p>
                </div>

                <div class="content">
                    <p class="welcome-text">
                        Welcome to Stock Alerts! We're excited to have you join our community of smart investors.
                    </p>

                    <p class="welcome-text" style="margin-bottom: 20px;">
                        To complete your registration and start receiving personalized trading alerts, please verify your email address by clicking the button below:
                    </p>

                    <a href="${link}" class="verification-button">
                        <svg style="width: 20px; height: 20px; margin-right: 8px; vertical-align: middle;" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Verify Email Address
                    </a>

                    <div class="note">
                        <p><strong>Note:</strong> This verification link will expire in 24 hours for security reasons.</p>
                        <p>If you didn't create an account with Stock Alerts, please ignore this email.</p>
                    </div>
                </div>

                <div class="footer">
                    <p class="footer-text">
                        © 2025 Stock Alerts. All rights reserved.<br>
                        This is an automated message, please do not reply to this email.
                    </p>
                </div>
            </div>
        </body>
        </html>
      `,
    };
    await step.run("send-verify-email", async () => {
      const info = await transporter.sendMail(mailOptions);
      console.log(
        "Email inviata con successo a:",
        email,
        "ID messaggio:",
        info.messageId
      );
      return { messageId: info.messageId };
    });
    return { success: true };
  }
);
