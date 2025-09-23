-- AlterTable
ALTER TABLE "Event" ADD COLUMN "sortAt" DATETIME;

-- AlterTable
ALTER TABLE "News" ADD COLUMN "sortAt" DATETIME;

-- CreateIndex
CREATE INDEX "Event_sortAt_idx" ON "Event"("sortAt");

-- CreateIndex
CREATE INDEX "News_sortAt_idx" ON "News"("sortAt");
