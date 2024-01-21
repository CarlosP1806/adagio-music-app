/*
  Warnings:

  - You are about to drop the column `musicalityScore` on the `PracticeSession` table. All the data in the column will be lost.
  - You are about to drop the column `techniqueScore` on the `PracticeSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PracticeSession` DROP COLUMN `musicalityScore`,
    DROP COLUMN `techniqueScore`;
