import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';


// TODO: move schemas to separate folders NO EXPORTS APART FROM ACTIONS IN THIS FILE 
export const formClassSchema = z.object({
    name: z.string().trim().min(1, {
        message: 'Class name is required'
    }),
    description: z.string().trim().min(1, {
        message: 'Class description is required'
    }),
    teacher: z.string().trim().min(1,{
        message: 'Teacher name is required'
    }),
})
export type FormClass = z.infer<typeof formClassSchema>
export const formClassResolver = zodResolver(formClassSchema);

export type ClassType = {
    name: string,
    description: string,
    teacher: string,
    id: string,
}
// export const classSchema = z.object({
//     name: z.string(),
//     description: z.string().default(''),
//     id: z.string(),
// })
