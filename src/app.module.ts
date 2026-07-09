import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { EventsController } from './events.controller';
import { FieldServiceController } from './field-service.controller';
import { FieldServiceService } from './field-service.service';
import { DispatchController } from './dispatch.controller';
import { DispatchService } from './dispatch.service';

@Module({
  controllers: [HealthController, EventsController, FieldServiceController, DispatchController],
  providers: [FieldServiceService, DispatchService],
})
export class AppModule {}
