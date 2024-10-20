import axios from "axios"
import { LoginResponse } from "../types/types";
import { parseJwt } from "../../helpers/jwt";
import { environment } from "../config/environment";

export const login = async ({ email, password }: { email: string, password: string }, callback: (user: LoginResponse) => void) => {

    try {
        const response = await axios.post(`${environment.URLS.BACK_URL}/user/login`, {
            email,
            password
        });

        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            const decoded = parseJwt(response.data.token);
            callback(decoded as LoginResponse)
        } else {
            throw new Error("Respuesta del servidor inválida.");
        }
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            throw new Error(err.response.data.message ?? "Error en el inicio de sesión.");
        } else {
            throw new Error("Error al conectar con el servidor.");
        }
    }
}