import z from "zod";

export const createUserSchema = z.object({
  fullname: z.string().min(3, "fullname minimal 3 karakter"),
  username: z.string().min(3, "username minimal 3 karakter").refine((s) => !s.includes(" "), "username tidak boleh mengandung spasi"),
  email: z.email("email tidak valid"),
  password: z.string().min(6, "password minimal 6 karakter"),
  role: z.enum(["admin", "user"], "role harus 'admin' atau 'user'"),
  address: z.string().min(10, "address minimal 10 karakter"),
  phone_number: z.string().min(10, "phone_number minimal 10 karakter"),
  age: z.number().min(1, "age harus lebih dari 0"),
});

export const updateUserSchema = z.object({
  fullname: z.string().min(3, "fullname minimal 3 karakter").optional(),
  username: z.string().min(3, "username minimal 3 karakter").optional(),
  email: z.email("email tidak valid").optional(),
  password: z.string().min(6, "password minimal 6 karakter").optional(),
  role: z.enum(["admin", "user"], "role harus 'admin' atau 'user'").optional(),
  address: z.string().min(10, "address minimal 10 karakter").optional(),
  phone_number: z.string().min(10, "phone_number minimal 10 karakter").optional(),
  age: z.number().min(1, "age harus lebih dari 0").optional(),
});
