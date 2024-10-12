import { useState } from "react";
import axios from "axios";
import { Header } from "../../molecules/Header/header";
import styles from './createClient.module.scss';
import { Footer } from "../../molecules/Footer/footer";
import Link from "next/link";

export default function CreateClient() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [nationality, setNationality] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [registerResponse, setRegisterResponse] = useState(""); // Updated state to handle response

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Validate fields
        if (!userName || !email || !password || !nationality || !gender || !phoneNumber) {
            setError("Por favor, completa todos los campos.");
            setIsLoading(false);
            return;
        }

        try {
            // Send registration request
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
        <div className={styles.loginPage}>
            <Header />
            <main className={styles.large_section_wrapper}>
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
                                placeholder="User Name"
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
                                placeholder="Nationality"
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
                                className={styles.input}>
                                <option value="">Select Gender</option>
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
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="@.com"
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
                                checked={true}
                                onChange={() => { /* logic for rules */ }}
                            />
                            <label htmlFor="rules">Rules</label>
                            <p className="p-girls">
                                By using this application, you agree to comply with the following rules. It is important that you read the terms carefully to ensure a safe and positive experience.
                            </p>
                        </div>

                        <div className={styles.termsSection}>
                            <input
                                type="checkbox"
                                id="terms"
                                checked={true}
                                onChange={() => { /* logic for terms */ }}
                            />
                            <label htmlFor="terms">I accept the Terms and Conditions</label>
                        </div>

                        <p className={styles.registerLink}>
                        Do you already have an account? Log in
                            <Link href="/login" className={styles.link}> Here</Link>
                        </p>

                        <div className={styles.benefitsSection}>
                            <p>Do you want to see your benefits when registering on our platform?</p>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isLoading}>
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
