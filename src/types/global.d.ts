declare global {

    type Risk = "LOW" | "MEDIUM" | "HIGH"

    type UserDetails = {
        id : number
        name : string
        email : string
        password : string
        nationality : string
        risk : Risk
    }
}

export {}