-- CreateTable
CREATE TABLE `PracticeSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endTime` DATETIME(3) NOT NULL,
    `satisfaction` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
