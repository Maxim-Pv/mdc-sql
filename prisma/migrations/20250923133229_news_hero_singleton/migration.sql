-- CreateTable
CREATE TABLE "NewsHero" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "locale" TEXT NOT NULL DEFAULT 'ru',
    "title" TEXT,
    "dateLabel" TEXT,
    "text" TEXT,
    "imageUrl" TEXT,
    "linkUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsHero_locale_key" ON "NewsHero"("locale");
