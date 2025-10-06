import z from "zod"
export const SearchSchema = z.object({
    search:z.string().min(1,"Inserire un parametro per avviare la ricerca"),
})

export type SearchProps = {
    search:string
    setSearch:React.Dispatch<React.SetStateAction<string>>
}

export type User = {
    id:string
    name:string
    email:string
}

export type UserProps = {
    user:User | null
    setUser:React.Dispatch<React.SetStateAction<User | null>>
}
