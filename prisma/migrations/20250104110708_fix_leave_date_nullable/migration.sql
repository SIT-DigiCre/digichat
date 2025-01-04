-- AlterTable
ALTER TABLE "ChannelMember" ALTER COLUMN "lastAccessedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "WorkspaceMember" ALTER COLUMN "leaveDate" DROP NOT NULL;
