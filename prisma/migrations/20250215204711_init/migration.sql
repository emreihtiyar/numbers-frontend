-- CreateTable
CREATE TABLE "game_results" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "lastNumber" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "game_results_lastNumber_idx" ON "game_results"("lastNumber");
