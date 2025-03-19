const z = require('zod');

export const UserSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8),
    Firstname: z.string(),
    Lastname: z.string()
})