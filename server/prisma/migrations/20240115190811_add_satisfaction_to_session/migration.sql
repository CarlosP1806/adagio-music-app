/*
  Warnings:

  - Made the column `satisfaction` on table `PracticeSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `PracticeSession` MODIFY `satisfaction` INTEGER NOT NULL;
