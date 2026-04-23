import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 8,
    requireEmailVerification: true,
    onExistingUserSignUp: async ({ user }) => {
      console.log(
        `\n⚠️  Tentative d'inscription avec un email déjà utilisé : ${user.email}`,
      );
      console.log(
        `📧 Un email de notification aurait été envoyé à l'utilisateur.\n`,
      );
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        from: '"Student Life" <noreply@studentlife.local>',
        to: user.email,
        subject: 'Vérifiez votre adresse email',
        text: `Bonjour ${user.name || user.email},\n\nCliquez sur ce lien pour vérifier votre email :\n${url}\n\nCe lien expire dans 24 heures.`,
        html: `<p>Bonjour ${user.name || user.email},</p><p>Cliquez sur le lien ci-dessous pour vérifier votre adresse email :</p><p><a href="${url}">${url}</a></p><p>Ce lien expire dans 24 heures.</p>`,
      });

      console.log(`\n📧 Email de vérification envoyé à ${user.email}`);
      console.log(`🔗 Lien : ${url}`);
      console.log(`📮 Consulte-le sur http://localhost:8025\n`);
    },
  },
});

export type Auth = typeof auth;
