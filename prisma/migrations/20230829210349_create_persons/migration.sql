-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "nickname" VARCHAR(32) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "persons_nickname_key" ON "persons"("nickname");
