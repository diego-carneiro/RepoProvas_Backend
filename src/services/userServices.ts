import { emailFinder } from "../repositories/userRepository";

export async function emailValidation(userEmail: string) {
    const emailCheck = await emailFinder(userEmail);

    if (emailCheck.length > 0) {
        throw {
            type: "conflict",
            message: "Email already in use"
        }
    }
    
    return;
};

