import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  SERVER_URL:  string  =  "http://localhost:3000/";
  constructor(private readonly mailerService: MailerService) { }
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this
      .mailerService
      .sendMail({
        to: 'test@nestjs.com', // List of receivers email address
        from: 'noreply@nestjs.com', // Senders email address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: `<img src = "D:/Incora/uploadfile/upload/${file.path}" >`, // HTML body content
        //`<img src = "D:/Incora/uploadfile/upload/${file.path}" >`
      })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log('Send ERROR:',err)
      });
    return `${this.SERVER_URL}${file.path}`
  }

  @Get('upload/:fileId')
  async serveFile (@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'upload'});
  }
}
