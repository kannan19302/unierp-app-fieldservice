import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { TenantRequest } from './tenant';

@Controller('dispatch')
export class DispatchController {
  constructor(private readonly dispatchService: DispatchService) {}

  @Get('board')
  async getBoard(@Req() req: TenantRequest, @Query('date') date?: string) {
    return this.dispatchService.getDispatchBoard(req.tenantContext.tenantId, date);
  }

  @Post('assign')
  async assign(
    @Req() req: TenantRequest,
    @Body() body: { ticketId: string; technicianId: string; scheduledTime: string; notes?: string },
  ) {
    return this.dispatchService.assignTechnician(req.tenantContext.tenantId, body);
  }

  @Patch(':id/status')
  async updateStatus(@Req() req: TenantRequest, @Param('id') id: string, @Body() body: { status: string }) {
    return this.dispatchService.updateDispatchStatus(req.tenantContext.tenantId, id, body.status);
  }

  @Get('sla')
  async getSlaStatus(@Req() req: TenantRequest) {
    return this.dispatchService.getSlaStatus(req.tenantContext.tenantId);
  }

  @Get('preventive-maintenance')
  async getUpcomingPM(@Req() req: TenantRequest, @Query('days') days?: string) {
    return this.dispatchService.getUpcomingPM(req.tenantContext.tenantId, Number(days) || 30);
  }
}
