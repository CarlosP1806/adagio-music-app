-- DropForeignKey
ALTER TABLE `Note` DROP FOREIGN KEY `Note_practiceId_fkey`;

-- DropForeignKey
ALTER TABLE `Recording` DROP FOREIGN KEY `Recording_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_practiceId_fkey` FOREIGN KEY (`practiceId`) REFERENCES `PracticeSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recording` ADD CONSTRAINT `Recording_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
