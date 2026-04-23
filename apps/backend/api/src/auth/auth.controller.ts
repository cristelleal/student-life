import {
  All,
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import { PrismaClient } from '@prisma/client';
import { auth } from '../lib/auth';
import { RegisterDto } from './dto/register.dto';

const prisma = new PrismaClient();

@Controller('/api/auth')
export class AuthController {
  private betterAuthHandler = toNodeHandler(auth);

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    // 1. Vérification de la confirmation du mot de passe
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Les mots de passe ne correspondent pas.');
    }

    // 2. Vérifier si l'email existe déjà (message générique)
    const existingUser = await prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      return {
        success: true,
        message:
          'Si cette adresse email est valide, un email de vérification a été envoyé.',
      };
    }

    // 3. Création via Better Auth
    const response = await auth.api.signUpEmail({
      body: {
        email: dto.email,
        password: dto.password,
        name: `${dto.firstName} ${dto.lastName}`,
      },
      asResponse: true,
    });

    if (response.status !== 200) {
      const errorData = await response.json().catch(() => ({}));
      throw new BadRequestException(
        errorData.message || "Une erreur est survenue lors de l'inscription.",
      );
    }

    const data = await response.json();

    // 4. Mise à jour des champs firstName et lastName
    if (data?.user?.id) {
      await prisma.user.update({
        where: { id: data.user.id },
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
    }

    return {
      success: true,
      message:
        'Inscription réussie. Veuillez consulter votre email pour valider votre compte.',
    };
  }

  @All('*')
  async handleAuth(@Req() req, @Res() res) {
    await this.betterAuthHandler(req, res);
  }
}
