import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { getMaxListeners } from 'node:process';


@Module({
  imports: [MulterModule.register({
    dest: './upload',
  }),
  MailerModule.forRoot({
    transport: {
      host: 'localhost',
      port: 1025,
      ignoreTLS: true,
      secure: false,
      auth: {
        user: process.env.MAILDEV_INCOMING_USER,
        pass: process.env.MAILDEV_INCOMING_PASS,
      },
      tls : { rejectUnauthorized: false }
    },
    //transport: 'smtps://user@domain.com:pass@smtp.domain.com',
    defaults: {
      from:'"No Reply" <no-reply@localhost>',
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
    
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
