/*
  Warnings:

  - You are about to drop the column `satisfaction` on the `PracticeSession` table. All the data in the column will be lost.
  - Added the required column `comfortScore` to the `PracticeSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `challengeScore` to the `PracticeSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `PracticeSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicalityScore` to the `PracticeSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `satisfactionScore` to the `PracticeSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `techniqueScore` to the `PracticeSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PracticeSession` DROP COLUMN `satisfaction`,
    ADD COLUMN `comfortScore` INTEGER NOT NULL,
    ADD COLUMN `challengeScore` INTEGER NOT NULL,
    ADD COLUMN `duration` INTEGER NOT NULL,
    ADD COLUMN `musicalityScore` INTEGER NOT NULL,
    ADD COLUMN `satisfactionScore` INTEGER NOT NULL,
    ADD COLUMN `techniqueScore` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `practiceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_practiceId_fkey` FOREIGN KEY (`practiceId`) REFERENCES `PracticeSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
