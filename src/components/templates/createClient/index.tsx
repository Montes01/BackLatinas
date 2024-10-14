import { useState } from "react";
import axios from "axios";
import { Header } from "../../molecules/Header/header";
import styles from './createClient.module.scss'; // Asegúrate de que esta ruta sea correcta
import { Footer } from "../../molecules/Footer/footer";
import Link from "next/link";
import { Arrow } from "../../atoms/Arrow/arrow"
import { Button } from "../../atoms/Button/button"
import { useNavigate } from "react-router-dom"

export default function CreateClient() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [nationality, setNationality] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [registerResponse, setRegisterResponse] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Validación de campos
        if (!userName || !email || !password || !nationality || !gender || !phoneNumber) {
            setError("Por favor, completa todos los campos.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://backlatinassexcam.onrender.com/LatinasSexCam/user/register', {
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
                setError(err.response.data.message || "Error en el registro.");
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
            <div className={styles.girlBase__backContainer}>
                        <Arrow className={styles.girlBase__backContainer__arrow}/>
                        <Button text="Back" className={styles.girlBase__backContainer__back} onClick={() => navigate(-1)} />   {/* el boton de back ya retrocede a la pagina anterios */}
                    </div>
                <div className={styles.loginContainer}>
                    <h2 className={styles.title}>Sign Up</h2>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    {registerResponse && (
                        <div className={styles.successMessage}>{registerResponse}</div>
                    )}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="userName">User Name</label>
                            <input
                                id="userName"
                                type="text"
                                placeholder="Enter your user name"
                                required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="nationality">Nationality</label>
                            <input
                                id="nationality"
                                type="text"
                                placeholder="Enter your nationality"
                                required
                                value={nationality}
                                onChange={(e) => setNationality(e.target.value)}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                required
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className={styles.input}
                            >
                                <option value="">Enter your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                id="phoneNumber"
                                type="tel"
                                placeholder="Phone Number"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your e-mail"
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

                        <div className={styles.rulesSection}>
                            <input
                                type="checkbox"
                                id="rules"
                                required // Añade esta línea si es obligatorio aceptar las reglas
                            />
                            <label htmlFor="rules">Rules</label>
                            <p style={{ color: "white" }}>
                                By using this application, you agree to comply with the following rules. It is important that you read the terms carefully to ensure a safe and positive experience.

                            </p>
                        </div>

                        <div className={styles.termsSection}>
                            <input
                                type="checkbox"
                                id="terms"
                                required // Añade esta línea si es obligatorio aceptar los términos
                            />
                            <label htmlFor="terms">I accept the Terms and Conditions</label>
                        </div>

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
