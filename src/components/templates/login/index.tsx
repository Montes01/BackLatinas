import { useState } from "react";
import axios from "axios";
import { Header } from "../../molecules/Header/header";
import styles from './login.module.scss';
import { Footer } from "../../molecules/Footer/footer";
import Link from "next/link";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!email || !password) {
            setError("Por favor, completa todos los campos.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://backlatinassexcam.onrender.com/LatinasSexCam/user/login', {
                email,
                password
            });

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);

                console.log("Login exitoso");

            } else {
                setError("Respuesta del servidor inválida.");
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || "Error en el inicio de sesión.");
            } else {
                setError("Error al conectar con el servidor.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <Header />
            <main className={styles.large_section_wrapper}>
                <div className={styles.loginContainer}>
                    <h2 className={styles.title}>Sign In</h2>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your user e-mail"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <Link href="/forgot-password" className={`${styles.forgotPassword} ${styles.yellowUnderline}`}>
                            Forgot your password?
                        </Link>
                        <button type="submit" className={styles.submitButton} disabled={isLoading}>
                            {isLoading ? 'Cargando...' : 'Confirmar'}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}