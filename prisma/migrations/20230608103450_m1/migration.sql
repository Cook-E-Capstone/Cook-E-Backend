/*
  Warnings:

  - Added the required column `userID` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Community` ADD COLUMN `userID` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Community` ADD CONSTRAINT `Community_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
