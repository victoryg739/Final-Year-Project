/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Settings_username_key" ON "Settings"("username");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
