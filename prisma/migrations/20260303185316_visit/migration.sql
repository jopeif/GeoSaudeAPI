-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'VACANT_LOT', 'STRATEGIC_POINT', 'HEALTH_FACILITY', 'SCHOOL', 'OTHER');

-- CreateEnum
CREATE TYPE "VisitType" AS ENUM ('ROUTINE', 'RECOVERY', 'LIRAA', 'BLOCKING');

-- CreateEnum
CREATE TYPE "PendingReason" AS ENUM ('NONE', 'REFUSED', 'CLOSED', 'ABSENT', 'ABANDONED', 'OTHER');

-- CreateEnum
CREATE TYPE "DepositType" AS ENUM ('A1', 'A2', 'B', 'C', 'D1', 'D2', 'E');

-- CreateEnum
CREATE TYPE "LarvicideType" AS ENUM ('NONE', 'BTI', 'PYRIPROXYFEN', 'DIFLUBENZURON', 'TEMEPHOS', 'OTHER');

-- CreateTable
CREATE TABLE "VisitForm" (
    "id" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,
    "localityCode" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "blockSide" TEXT,
    "complement" TEXT,
    "propertyType" "PropertyType" NOT NULL,
    "residentName" TEXT,
    "phone" TEXT,
    "entryTime" TEXT,
    "visitType" "VisitType" NOT NULL,
    "inspected" BOOLEAN NOT NULL,
    "pendingReason" "PendingReason",
    "depositsWithFocus" BOOLEAN NOT NULL,
    "depositType" "DepositType",
    "larvicideUsed" "LarvicideType",
    "treatedDeposits" INTEGER NOT NULL,
    "eliminatedDeposits" INTEGER NOT NULL,
    "depositsA1" INTEGER NOT NULL,
    "depositsA2" INTEGER NOT NULL,
    "depositsB" INTEGER NOT NULL,
    "depositsC" INTEGER NOT NULL,
    "depositsD1" INTEGER NOT NULL,
    "depositsD2" INTEGER NOT NULL,
    "depositsE" INTEGER NOT NULL,
    "treatmentApplied" BOOLEAN NOT NULL,
    "treatmentLarvicideType" "LarvicideType",
    "larvicideAmount" DOUBLE PRECISION,
    "perifocalDeposits" INTEGER NOT NULL,
    "adulticideLoads" INTEGER NOT NULL,
    "sampleCollected" BOOLEAN NOT NULL,
    "sampleCode" TEXT,
    "tubeCount" INTEGER NOT NULL,
    "notes" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "VisitForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VisitForm_userId_idx" ON "VisitForm"("userId");

-- CreateIndex
CREATE INDEX "VisitForm_visitDate_idx" ON "VisitForm"("visitDate");

-- AddForeignKey
ALTER TABLE "VisitForm" ADD CONSTRAINT "VisitForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
