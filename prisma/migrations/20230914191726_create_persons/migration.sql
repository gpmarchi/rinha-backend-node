-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "nickname" VARCHAR(32) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "birthdate" DATE NOT NULL,
    "techs" TEXT NOT NULL,
    "searchable_trgm" TEXT GENERATED ALWAYS AS (LOWER(name || nickname || techs)) STORED,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

CREATE EXTENSION IF NOT EXISTS pg_trgm SCHEMA pg_catalog;

-- CreateIndex
CREATE UNIQUE INDEX "persons_nickname_key" ON "persons"("nickname");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "persons_searchable_tgrm_idx" ON "persons" USING GIST (searchable_trgm GIST_TRGM_OPS(SIGLEN=64));
CREATE INDEX IF NOT EXISTS "persons_nickname_idx" ON "persons" USING btree (nickname);