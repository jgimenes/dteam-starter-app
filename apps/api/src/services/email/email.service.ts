/*import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import { Resend } from 'resend';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(private readonly prisma: PrismaService) {}

  async sendEmailRegisterAccessCode({
    to,
    code,
    responseMessage,
  }: {
    to: string;
    code: string;
    responseMessage?: string;
  }): Promise<{ success: boolean; message: string }> {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailFrom = process.env.RESEND_EMAIL_FROM || 'onboarding@resend.dev';
    const templateName = 'register-access-code';
    const subject = 'Código de acesso para o seu cadastro';

    try {
      const template = await this.prisma.template.findUnique({
        where: { name: templateName },
      });

      if (!template || !template.body) {
        throw new InternalServerErrorException(
          `Template '${templateName}' não encontrado ou inválido.`
        );
      }

      const compiledTemplate = Handlebars.compile(template.body);
      const html = compiledTemplate({ code });

      await resend.emails.send({
        from: emailFrom,
        to,
        subject,
        html,
      });

      return {
        success: true,
        message: responseMessage || 'Código de acesso enviado com sucesso.',
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao enviar e-mail:', error.message);
      } else {
        console.error('Erro inesperado ao enviar e-mail:', error);
      }

      return {
        success: false,
        message: `Erro ao enviar o e-mail para ${to}. Por favor, tente novamente.`,
      };
    }
  }
}*/
