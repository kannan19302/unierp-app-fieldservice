import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FieldServiceService } from './field-service.service';
import { TenantRequest } from './tenant';
import { ScopeGuard } from './scope.guard';

/**
 * Reached only through core's ext-gateway at /api/v1/ext/field-service/*.
 * Tenant identity comes from the verified tenant-context token, never from
 * the client.
 */
@UseGuards(ScopeGuard)
@Controller()
export class FieldServiceController {
  constructor(private readonly service: FieldServiceService) {}

  @Get('tickets')
  async getTickets(@Req() req: TenantRequest) {
    return this.service.getTickets(req.tenantContext.tenantId);
  }

  @Post('tickets')
  async createTicket(
    @Req() req: TenantRequest,
    @Body() dto: { title: string; customerName: string; description: string; priority?: string; slaDeadline: string },
  ) {
    return this.service.createTicket(req.tenantContext.tenantId, dto);
  }

  @Get('dispatches')
  async getDispatches(@Req() req: TenantRequest) {
    return this.service.getDispatches(req.tenantContext.tenantId);
  }

  @Post('dispatches')
  async createDispatch(
    @Req() req: TenantRequest,
    @Body() dto: { ticketId: string; technicianId: string; scheduledTime: string; routeDetails: string },
  ) {
    return this.service.createDispatch(req.tenantContext.tenantId, dto);
  }

  @Get('checklists')
  async getChecklists(@Req() req: TenantRequest) {
    return this.service.getChecklists(req.tenantContext.tenantId);
  }

  @Post('checklists')
  async createChecklist(
    @Req() req: TenantRequest,
    @Body() dto: { dispatchId: string; items: string; signatureUrl?: string },
  ) {
    return this.service.createChecklist(req.tenantContext.tenantId, dto);
  }

  @Get('preventative')
  async getPreventativeMaintenances(@Req() req: TenantRequest) {
    return this.service.getPreventativeMaintenances(req.tenantContext.tenantId);
  }

  @Post('preventative')
  async createPreventativeMaintenance(
    @Req() req: TenantRequest,
    @Body() dto: { customerName: string; description: string; recurrenceCron: string; nextRunDate: string },
  ) {
    return this.service.createPreventativeMaintenance(req.tenantContext.tenantId, dto);
  }
}
