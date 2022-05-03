import { prisma } from "../src/database.js";
import { Category, Discipline, Term, Teacher, TeacherDiscipline } from "@prisma/client"


type CategoryInterface = Omit<Category, "id">;
type DisciplineInterface = Omit<Discipline, "id">;
type TermInterface = Omit<Term, "id">;
type TeacherInterface = Omit<Teacher, "id">;
type TeacherDisciplineInterface = Omit<TeacherDiscipline, "id">;

async function main() {

  const categorySeed: CategoryInterface[] = [
    {
      name: "P1"
    },
    {
      name: "P2"
    },
    {
      name: "P3"
    }
  ]

  const termsSeed: TermInterface[] = [
    {
      number: 1
    },
    {
      number: 2
    },
    {
      number: 3
    },
    {
      number: 4
    }
  ]

  const disciplinesSeed: DisciplineInterface[] = [
    {
      name: "JavaScript",
      termId: 1
    },
    {
      name: "CSS",
      termId: 2
    },
    {
      name: "TypeScript",
      termId: 3
    },
    {
      name: "React",
      termId: 4
    }
  ];

  const teacherSeeds: TeacherInterface[] = [
    {
      name: "Dina"
    },
    {
      name: "Pedrão"
    },
    {
      name: "Leandro"
    }
  ]

  const teacherDisciplineSeed: TeacherDisciplineInterface[] = [
    {
      teacherId: 1,
      disciplineId: 1
    },
    {
      teacherId: 2,
      disciplineId: 2
    },
    {
      teacherId: 3,
      disciplineId: 3
    },
    {
      teacherId: 3,
      disciplineId: 1
    },
  ]

  for (let i = 0; i < categorySeed.length; i++) {
    const element = categorySeed[i];

    await prisma.category.upsert({
      where: { name: element.name },
      update: {},
      create: {
        ...element
      }
    });
  }

  for (let i = 0; i < termsSeed.length; i++) {
    const element = termsSeed[i];

    await prisma.term.upsert({
      where: { number: element.number },
      update: {},
      create: {
        ...element
      }
    });
  }

  for (let i = 0; i < disciplinesSeed.length; i++) {
    const element = disciplinesSeed[i];

    await prisma.discipline.upsert({
      where: { name: element.name },
      update: {},
      create: {
        ...element
      }
    });
  }

  for (let i = 0; i < teacherSeeds.length; i++) {
    const element = teacherSeeds[i];

    await prisma.teacher.upsert({
      where: { name: element.name },
      update: {},
      create: {
        ...element
      }
    });
  }

  for (let i = 0; i < teacherDisciplineSeed.length; i++) {
    const element = teacherDisciplineSeed[i];

    await prisma.teacherDiscipline.create({
      data: {
        teacherId: element.teacherId,
        disciplineId: element.disciplineId,
      }
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });