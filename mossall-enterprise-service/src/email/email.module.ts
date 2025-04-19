import { forwardRef, Module } from '@nestjs/common';
import { SendinblueService } from './services/sendinblue.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SendinblueService],
  exports: [SendinblueService],
})
export class EmailModule {}
