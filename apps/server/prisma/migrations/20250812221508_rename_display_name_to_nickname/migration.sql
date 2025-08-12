/*
  Warnings:

  - You are about to drop the column `displayName` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "displayName",
ADD COLUMN     "nickname" VARCHAR(50);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "fromId" INTEGER,
    "title" VARCHAR(200) NOT NULL,
    "message" TEXT NOT NULL,
    "variant" VARCHAR(20) NOT NULL DEFAULT 'default',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
