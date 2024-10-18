import { useState } from "react";
import axios from "axios";
import { Header } from "../../molecules/Header/header";
import styles from "./createGirls.module.scss";
import { Footer } from "../../molecules/Footer/footer";
import Link from "next/link";

export default function CreateGirls() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationality, setNationality] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registerResponse, setRegisterResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validar campos
    if (!name || !userName || !email || !password || !nationality || !phoneNumber) {
      setError("Por favor, completa todos los campos.");
      setIsLoading(false);
      return;
    }

    // Validar formato de email
    const validateEmail = (email: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validateEmail(email)) {
      setError("El formato del email no es válido.");
      setIsLoading(false);
      return;
    }

    try {
      // Enviar la solicitud de registro
      const response = await axios.post(
        "https://backlatinassexcam.onrender.com/LatinasSexCam/user/register",
        {
          name,
          user_name: userName,
          email,
          password,
          nationality,
          phoneNumber,
        }
      );

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
          {error && <span className={styles.errorMessage}>{error}</span>}
          {registerResponse && (
            <div className={styles.successMessage}>{registerResponse}</div>
          )}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
              />
            </div>

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
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="example@domain.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                placeholder="Your Phone Number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
            
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                  <h2>🟡 PRIORITY</h2>
                  <h3>1000 NOK</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              </div>
              <div className={styles.card}>
                  <h2>⚪ PUBLICITY</h2>
                  <h3>800 NOK</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              </div>
            </div>

            <div className={styles.rulesSection}>
              <input
                type="checkbox"
                id="rules"
                checked={true}
                onChange={() => {}}
              />
              <label htmlFor="rules">Rules</label>
              <p className="p-girls">
                By using this application, you agree to comply with the
                following rules. It is important that you read the terms
                carefully to ensure a safe and positive experience.
              </p>
            </div>

            <div className={styles.termsSection}>
              <input
                type="checkbox"
                id="terms"
                checked={true}
                onChange={() => {}}
              />
              <label htmlFor="terms">I accept the Terms and Conditions</label>
            </div>

            <p className={styles.registerLink}>
              Do you already have an account? Log in
              <Link href="/login" className={styles.link}>
                {" "}
                Here
              </Link>
            </p>

            <div className={styles.benefitsSection}>
              <p>
                Do you want to see your benefits when registering on our
                platform?
              </p>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
