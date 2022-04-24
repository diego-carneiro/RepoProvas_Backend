import { prisma } from "../database";

export async function emailFinder(email: string){
    const search = await prisma.user.findMany({
        where: { email },
    });

    return search;
}