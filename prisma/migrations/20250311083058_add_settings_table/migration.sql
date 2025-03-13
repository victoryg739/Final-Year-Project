-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "responseDelay" INTEGER NOT NULL,
    "openAiApiKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
