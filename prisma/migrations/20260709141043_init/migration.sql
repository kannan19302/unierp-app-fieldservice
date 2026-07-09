-- CreateTable
CREATE TABLE "service_tickets" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "sla_deadline" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_dispatches" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "technician_id" TEXT NOT NULL,
    "scheduled_time" TIMESTAMP(3) NOT NULL,
    "route_details" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ASSIGNED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_dispatches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technician_checklists" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "dispatch_id" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "signature_url" TEXT,
    "is_offline_synced" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "technician_checklists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preventative_maintenances" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "recurrence_cron" TEXT NOT NULL,
    "next_run_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "preventative_maintenances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "service_tickets_tenant_id_idx" ON "service_tickets"("tenant_id");

-- CreateIndex
CREATE INDEX "service_dispatches_tenant_id_idx" ON "service_dispatches"("tenant_id");

-- CreateIndex
CREATE INDEX "technician_checklists_tenant_id_idx" ON "technician_checklists"("tenant_id");

-- CreateIndex
CREATE INDEX "preventative_maintenances_tenant_id_idx" ON "preventative_maintenances"("tenant_id");

-- AddForeignKey
ALTER TABLE "service_dispatches" ADD CONSTRAINT "service_dispatches_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "service_tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technician_checklists" ADD CONSTRAINT "technician_checklists_dispatch_id_fkey" FOREIGN KEY ("dispatch_id") REFERENCES "service_dispatches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
