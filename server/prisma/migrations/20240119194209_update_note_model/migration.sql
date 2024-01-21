/*
  Warnings:

  - You are about to drop the column `practiceId` on the `Note` table. All the data in the column will be lost.
  - Added the required column `sessionId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Note` DROP FOREIGN KEY `Note_practiceId_fkey`;

-- AlterTable
ALTER TABLE `Note` DROP COLUMN `practiceId`,
    ADD COLUMN `sessionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `PracticeSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
