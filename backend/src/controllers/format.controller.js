import zod from "zod";

const Userschema=zod.object({
    email: z.string().email(),
    username: z.string().min(3).max(20),
    password:z.string().min(8).regex(/[A-Z]/).regex(/[^A-Za-z0-9]/)
})

export default Userschema;
