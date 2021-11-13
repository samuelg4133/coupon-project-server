-- CreateTable
CREATE TABLE "reset_pwd_tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "reset_pwd_tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reset_pwd_tokens" ADD CONSTRAINT "reset_pwd_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
