-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "tittle" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "pathfile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);
