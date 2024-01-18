/*
  Warnings:

  - A unique constraint covering the columns `[userId,filename]` on the table `Recording` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alias` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Recording` ADD COLUMN `alias` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Recording_userId_filename_key` ON `Recording`(`userId`, `filename`);
