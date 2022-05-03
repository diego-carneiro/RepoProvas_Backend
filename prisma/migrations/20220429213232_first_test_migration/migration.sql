/*
  Warnings:

  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teacherDisciplines` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "teacherDisciplines" DROP CONSTRAINT "teacherDisciplines_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "teacherDisciplines" DROP CONSTRAINT "teacherDisciplines_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_teacherDisciplineId_fkey";

-- DropIndex
DROP INDEX "tests_categoryId_key";

-- DropIndex
DROP INDEX "tests_teacherDisciplineId_key";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "teacherDisciplines";

-- CreateTable
CREATE TABLE "TeacherDiscipline" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,

    CONSTRAINT "TeacherDiscipline_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeacherDiscipline" ADD CONSTRAINT "TeacherDiscipline_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherDiscipline" ADD CONSTRAINT "TeacherDiscipline_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "TeacherDiscipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
