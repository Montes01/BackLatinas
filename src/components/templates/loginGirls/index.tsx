import { useState } from "react";
import axios from "axios";
import { Header } from "../../molecules/Header/header";
import styles from "./loginGirls.module.scss";
import { Footer } from "../../molecules/Footer/footer";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loginResponse, setLoginResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setLoginResponse(null);

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Intentando iniciar sesión con:", { email, password });
      const response = await axios.post(
        "https://backlatinassexcam.onrender.com/LatinasSexCam/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Respuesta completa:", response);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setLoginResponse("Login exitoso.");
        console.log("Login exitoso");
      } else {
        setError("Respuesta del servidor inválida.");
        console.log("Respuesta inesperada:", response.data);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("Error de Axios:", err.message);
        console.log("Datos de respuesta:", err.response?.data);
        console.log("Estado de respuesta:", err.response?.status);
        setError(
          err.response?.data?.message || "Error en el inicio de sesión."
        );
      } else {
        console.log("Error inesperado:", err);
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
          {loginResponse && (
            <div className={styles.successMessage}>{loginResponse}</div>
          )}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className="email" htmlFor="email">E-mail</label>
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
              <label className="password" htmlFor="password">Password</label>
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

            <Link href="/forgot-password" className={styles.forgotPassword}>
              ¿Olvidaste tu contraseña?
            </Link>
          </form>

          <div className={styles.rulesSection}>
            <input
              type="checkbox"
              id="rules"
              checked={rulesAccepted}
              onChange={() => setRulesAccepted(!rulesAccepted)}
            />
            <label htmlFor="rules" className={styles.checkboxLabel}>Rules</label>
            <p className="p-girls">
              By using this application, you agree to comply with the following
              rules. It is important that you read the terms carefully to ensure
              a safe and positive experience
            </p>
          </div>

          <div className={styles.termsSection}>
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label htmlFor="terms">I accept the Terms and Conditions</label>
          </div>

          <p className={styles.registerLink}>
            You still don't have an account? register.
            <Link href="/terms" className={styles.link}>
              {" "}
              Here
            </Link>
          </p>
            <br />
          <div className={styles.benefitsSection}>
            <p>Do you want to see the benefits you get by being our client?</p>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}>
              {isLoading ? "Cargando..." : "Confirmar"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
