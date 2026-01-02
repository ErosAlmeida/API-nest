import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';

@Controller('user')
export class UserController {
  configService: any;
  @Get(':id')
  findOne(@Param('id', CustomParseIntPipe) id: number) {
    console.log(process.env.TESTE1 || 'Padrão');
    console.log(this.configService.getOrThrow('TESTE1'));
    return `olá do controller do user #${id}`;
  }
}
