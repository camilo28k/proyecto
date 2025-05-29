import { Module } from '@nestjs/common';
import { CategorysModule } from './categorys/categorys.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { CommentsModule } from './comments/comments.module';
import { DonationsModule } from './donations/donations.module';
import { FacturasModule } from './facturas/facturas.module';

@Module({
  imports: [CategorysModule, CampaignsModule, CommentsModule, DonationsModule, FacturasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
