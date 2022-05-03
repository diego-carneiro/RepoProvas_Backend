import * as teacherRepository from "../repositories/teacherDisciplineRepository.js"

export async function getAllTeacherDiscipline() {
    const categoriesData = await teacherRepository.findAllTeacherDiscipline();
    
    return categoriesData;
}
