import axios from "axios"

export const Post_Method = async (method: string, url: string, body: any) => {
    let error = null
    let data = null
    let status = null
    let isLoading = true
    try {
        const response = await axios.post(url, { ...body, method, })
        data = response.data
        status = response.status
        isLoading = false
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            error = error.response.data.message ?? "Hubo un error."
        } else {
            error = "Error al conectar con el servidor."
        }
    }
    return { data, status, error }
}