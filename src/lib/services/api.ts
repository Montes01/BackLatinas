import axios from "axios"
import { Comment, FilterResponse, GirlResponse, LoginResponse, PackageResponse, RegisterWomenRequest, ServiceResponse, SubService, WomenRequest } from "../types/types";
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
            throw new Error(err.response.data.message ?? "There was an error logging in.");
        } else {
            throw new Error("Error al conectar con el servidor.");
        }
    }
}

export const register = async (body: { user_name: string, email: string, password: string, nacionality: string, }) => {
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

export const deleteComment = async (idComment: number, comment: { comment: string, email: string, Stars: number }) => {
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

export const getGirls = async (): Promise<GirlResponse[]> => {
    try {
        const response = await axios.get(`${environment.URLS.BACK_URL}/women/womens`);
        return response.data;
    } catch (err) {
        console.error("Error al obtener las chicas:", err);
        throw new Error("Error al obtener las chicas.");
    }
}

export const getServices = async (): Promise<ServiceResponse[]> => {
    try {
        const response = await axios.get(`${environment.URLS.BACK_URL}/service/services`);
        return response.data;
    } catch (err) {
        console.error("Error al obtener los servicios:", err);
        throw new Error("Error al obtener los servicios.");
    }
}

export const getFilters = async (): Promise<FilterResponse> => {
    try {
        const response = await axios.get(`${environment.URLS.BACK_URL}/user/filters`);
        return response.data;
    } catch (err) {
        console.error("Error al obtener los filtros:", err);
        throw new Error("Error al obtener los filtros.");
    }
}

export const postGirlByAdmin = async (women: WomenRequest) => {
    const token = localStorage.getItem(tokenName);
    console.log(parseJwt(token!));
    try {
        const response = await axios.post(`${environment.URLS.BACK_URL}/admin/register`, women, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (err) {
        console.error("Error chicas:", err);
        throw new Error("There was an error creating the women");
    }
}

export const updateGirlByAdmin = async (women: WomenRequest) => {
    const token = localStorage.getItem(tokenName);
    console.log(parseJwt(token!));
    try {
        const response = await axios.post(`${environment.URLS.BACK_URL}/admin/updateInfo`, women, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (err) {
        console.error("Error al obtener las chicas:", err);
        throw new Error("Error al obtener las chicas.");
    }
}

export const getGirlByUsername = async (username: string): Promise<WomenRequest> => {
    console.log('username', username);
    try {
        const response = await axios.post(`${environment.URLS.BACK_URL}/women/info`, {
            user_name: username,
        });

        const mapServiceIds = response.data.services.map((service: { idService: number }) => service.idService);
        const mapFilterNames = response.data.categoryFilters.map((filter: { name: string }) => filter.name);
        const body = { ...response.data as WomenRequest, selectedServiceIds: mapServiceIds, selectedFilterNames: mapFilterNames }
        console.log('body', body);
        return body;
    } catch (err) {
        console.error("Error al obtener la chica:", err);
        throw new Error("Error al obtener la chica.");
    }
}

export const getSubServices = async (serviceId: number): Promise<SubService[]> => {
    try {
        const response = await axios.get(`${environment.URLS.BACK_URL}/user/subServices/${serviceId}`);
        return response.data;
    } catch (err) {
        console.error("Error al obtener los sub-servicios:", err);
        throw new Error("Error al obtener los sub-servicios.");
    }
}

export const getPackages = async (): Promise<PackageResponse[]> => {
    try {
        const response = await axios.get(`${environment.URLS.BACK_URL}/packages`);
        return response.data;
    } catch (err) {
        console.error("Error al obtener los paquetes:", err);
        throw new Error("Error al obtener los paquetes.");
    }
}

export const postGirl = async (girl: RegisterWomenRequest) => {
    try {
        const response = await axios.post(`${environment.URLS.BACK_URL}/women/register`, girl);
        return response.data;
    } catch (err) {
        console.error("Error al obtener las chicas:", err);
        throw new Error("There was an error getting womens")
    }
}

export const getComments = async (): Promise<Comment[]> => {
    try {
        const response = await axios.get(`${environment.URLS.BACK_URL}/comments`);
        return response.data;
    } catch (err) {
        console.error("Error al obtener los comentarios:", err);
        throw new Error("There was an error getting comments.");
    }
}

export const getGirlsCount = async (): Promise<number> => {
    try {
        const response = await axios.get(`${environment.URLS.BACK_URL}/women/count`); 
        return response.data;
    } catch (err) {
        console.error("Error al obtener el total de chicas:", err);
        throw new Error("There was an error getting girls.");
    }
}

export const deleteGirlByAdmin = async (username: string) => {
    try {
        const response = await axios.delete(`${environment.URLS.BACK_URL}/admin/deleteWomen/${username}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(tokenName)}`
            }
        });
        return response.data;
    } catch (err) {
        console.error("Error al eliminar la chica:", err);
        throw new Error("There was an error removing the women.");
    }
}