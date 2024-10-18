import { useState } from "react";
import axios from "axios";
import { Header } from "../../molecules/Header/header";
import styles from './createClient.module.scss';
import { Footer } from "../../molecules/Footer/footer";
import Link from "next/link";
import { BackButton } from "../../molecules/BackButton/backButton";
import { Input } from "../../atoms/Input/input";
import { Select } from "../../atoms/Select/select";
import { GENDER_OPTIONS } from "../../../lib/constants/general";
import { environment } from '../../../lib/config/environment'
import { Rule } from "../../atoms/Rule/rule";
import { RULE_TEXT, TERMS_AND_CONDITIONS_TEXT } from "../../../lib/constants/registerConstants";

export default function CreateClient() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [registerResponse, setRegisterResponse] = useState("");
    console.log(environment.URLS.BACK_URL)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target as HTMLFormElement);
        const userName = formData.get("userName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string
        const nationality = formData.get("nationality") as string;
        const gender = formData.get("gender") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        if (!userName || !email || !password || !nationality || !gender || !phoneNumber) {
            setError("Por favor, completa todos los campos.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${environment.URLS.BACK_URL}user/register`, {
                user_name: userName,
                email: email,
                password: password,
                nacionality: nationality,
                gender: gender,
                phoneNumber: phoneNumber
            });

            if (response.data && response.data.message) {
                setRegisterResponse(response.data.message);
            } else {
                setError("Respuesta del servidor inválida.");
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message ?? "Error en el registro.");
            } else {
                setError("Error al conectar con el servidor.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.createClientPage}>
            <Header />
            <main className={styles.large_section_wrapper}>
                <BackButton />
                <div className={styles.loginContainer}>
                    <h2 className={styles.title}>Sign Up</h2>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    {registerResponse && (
                        <div className={styles.successMessage}>{registerResponse}</div>
                    )}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <Input label="User Name" type="text" placeholder="Enter your user name" required name="userName" />
                        <Input label="Nationality" type="text" placeholder="Enter your nationality" required name="nationality" />
                        <Select options={GENDER_OPTIONS} label="Gender" />
                        <Input label="Phone Number" type="tel" placeholder="Phone Number" required name="phoneNumber" />
                        <Input label="E-mail" type="email" placeholder="Enter your e-mail" required name="email" />
                        <Input label="Password" type="password" placeholder="Enter your password" required name="password" />
                        <Rule rule={RULE_TEXT} title="Rules" important/>
                        <Rule title={TERMS_AND_CONDITIONS_TEXT} labelUrl="/home" />

                        <p className={styles.registerLink}>
                            Do you already have an account? Log in
                            <Link href="/login" className={styles.link}> Here</Link>
                        </p>

                        <div className={styles.benefitsSection}>
                            <p><strong>Do you want to see your benefits when registering on our platform?</strong></p>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isLoading}
                            >
                                {isLoading ? "Cargando..." : "Confirmar"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
