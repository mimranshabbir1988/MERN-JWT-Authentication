import bcrypt from 'bcrypt';

// hashing a password
export const hashPassword = async(password) =>{
    try {
        const saltRounds = 10;
        let hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword;        
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async(password, hashedPassword) =>{
    return await bcrypt.compare(password, hashedPassword)
}


