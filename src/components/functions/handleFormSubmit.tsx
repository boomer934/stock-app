import axios from "axios"

type emailFormProps = {
    email:string,
    setEmail:React.Dispatch<React.SetStateAction<string>>,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setError:React.Dispatch<React.SetStateAction<string | null>>
}
export async function handleFormSubmit(e:React.FormEvent<HTMLFormElement>,{email,setEmail,setLoading,setError}:emailFormProps){
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
        const response = await axios.post('/api/email-verification', { email })
        setEmail("")
        console.log(response.data)
    } catch (error) {
        console.error(error)
        setError('Si è verificato un errore durante la registrazione')
    } finally {
        setLoading(false)
    }
}
    