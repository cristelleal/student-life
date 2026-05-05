-- ADD Etablisement / Sector / studyLevel to User
ALTER TABLE "User" ADD COLUMN "establishment" TEXT;
ALTER TABLE "User" ADD COLUMN "sector" TEXT;
ALTER TABLE "User" ADD COLUMN "studyLevel" TEXT;