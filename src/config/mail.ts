interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  // colocar o email configurado na aws e importar ele no SESMailProvider.ts
  // defaults: {
  //   from: {
  //     email: 'william@aws.com.br',
  //     name: 'William Amorim',
  //   },
  // },
} as IMailConfig;
