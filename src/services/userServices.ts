import { emailFinder } from "../repositories/userRepository";

export async function emailValidation(userEmail: string): Promise<any> {
    const emailCheck = await emailFinder(userEmail);

    if (emailCheck.length > 0) {
        throw {
            type: "conflict",
            message: "Email already in use"
        }
    }
    
    return;
};

