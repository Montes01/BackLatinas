import { useState } from "react";
import axios from "axios";
import { Header } from "../../molecules/Header/header";
import styles from './login.module.scss';
import { Footer } from "../../molecules/Footer/footer";
import Link from "next/link";
import { Input } from "../../atoms/Input/input";
import { BackButton } from "../../molecules/BackButton/backButton";
import { useAppDispatch } from "../../../lib/contexts/hooks";
import { login } from "../../../lib/services/api";
import { LoginResponse } from "../../../lib/types/types";
import { setUser } from "../../../lib/contexts/auth/authSlice";

export const Login = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string
        if (!email || !password) {
            setError("Por favor, completa todos los campos.");
            setIsLoading(false);
            return;
        }
        const body = { email: email, password: password }
        const callback = (user: LoginResponse) => {
            dispatch(setUser(user));
        }

        try {
           await login(body, callback);
        } catch (err) {
            setError((err as Error).message)
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <Header />
            <main className={styles.large_section_wrapper}>
                <BackButton />
                <div className={styles.loginContainer}>
                    <h2 className={styles.title}>Sign In</h2>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <Input label="E-mail" name="email" type="email" placeholder="Enter your user e-mail" required />
                        <Input label="Password" name="password" type="password" placeholder="Enter your password" required />
                        <Link href="/forgot-password" className={`${styles.forgotPassword} ${styles.yellowUnderline}`}>
                            Forgot your password?
                        </Link>
                        <button type="submit" className={styles.submitButton} disabled={isLoading}>
                            {isLoading ? 'Cargando...' : 'Confirmar'}
                        </button>
                    </form>
                </div>
            <Footer />
            </main>
        </div>
    );
}