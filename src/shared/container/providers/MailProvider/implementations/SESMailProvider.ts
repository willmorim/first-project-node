import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
// import mailConfig from '@config/mail'; IMPORTANDO A CONFIGURAÇÃO DO EMAIL QUE FOI CONFIGURADO NA AWS
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplatePRovider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    // const { name, email } = mailConfig.defaults.from; utilizar o email da aws
    await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber', // subistituir por name aws
        address: from?.email || 'equipe@gobarber.com.br', // subistituir por email aws
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplatePRovider.parse(templateData),
    });
  }
}
