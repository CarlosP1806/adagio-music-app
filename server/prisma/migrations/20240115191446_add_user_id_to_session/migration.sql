/*
  Warnings:

  - Added the required column `userId` to the `PracticeSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PracticeSession` ADD COLUMN `userId` INTEGER NOT NULL;
