import axios from "axios"
import {  LoginResponse } from "../types/types";
import { parseJwt } from "../../helpers/jwt";
import { environment } from "../config/environment";
import { tokenName } from "../constants/general";

export const login = async ({ email, password }: { email: string, password: string }, callback: (user: LoginResponse) => void) => {

    try {
        const response = await axios.post(`${environment.URLS.BACK_URL}/user/login`, {
            email,
            password
        });

        if (response.data && response.data.token) {
            localStorage.setItem(tokenName, response.data.token);
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

export const register = async (body: { user_name: string, email: string, password: string, nacionality: string,}) => {
    try {
        const response = await axios.post(`${environment.URLS.BACK_URL}/user/register`, body);
        if (response.status !== 201) {
            throw new Error("Respuesta del servidor inválida.");
        } else {
            console.log("Usuario registrado con éxito.");
            return;
        }
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            throw new Error(err.response.data.message ?? "Error en el registro.");
        } else {
            throw new Error("Error al conectar con el servidor.");
        }
    }
}

export const deleteComment = async ( idComment: number , comment: { comment: string, email: string, Stars: number}) => {
    try {
        console.log(`Eliminando comentario ${idComment}...`);
        const response = await axios.delete(
            `${environment.URLS.BACK_URL}/deleteComment/${idComment}`,
            {
                data: comment,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(tokenName)}`
                }
            }
        );
        console.log('response', response);
        console.log(`Comentario ${idComment} eliminado con éxito)`);
    } catch (error) {
        console.error("Error al eliminar el comentario:", error);
        throw new Error("Error al eliminar el comentario.");
    }
}

