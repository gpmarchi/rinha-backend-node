-- CreateTable
CREATE TABLE "techs" (
    "id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "name" VARCHAR(32) NOT NULL,

    CONSTRAINT "techs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "techs" ADD CONSTRAINT "techs_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
