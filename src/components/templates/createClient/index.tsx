import { useState } from "react";
import { Header } from "../../molecules/Header/header";
import styles from './createClient.module.scss';
import { Footer } from "../../molecules/Footer/footer";
import Link from "next/link";
import { BackButton } from "../../molecules/BackButton/backButton";
import { Input } from "../../atoms/Input/input";
import { Select } from "../../atoms/Select/select";
import { GENDER_OPTIONS } from "../../../lib/constants/general";
import { Rule } from "../../atoms/Rule/rule";
import { RULE_TEXT, TERMS_AND_CONDITIONS_TEXT } from "../../../lib/constants/registerConstants";
import { Button } from "../../atoms/Button/button";
import { register } from "../../../lib/services/api";
import { AlertModal, AlertModalProps } from "../../molecules/AlertModal/alertModal";

export default function CreateClient() {
    const [error, setError] = useState("");
    const [registerResponse, setRegisterResponse] = useState("");
    const [modalProps, setModalProps] = useState({
        isOpen: false,
        isLoading: false,
        message: '',
        onOk: () => { }
    } as AlertModalProps);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setModalProps(props => ({
            ...props, isLoading: true, isOpen: true, message: 'Registering', onOk: () => {
                setModalProps(props => ({ ...props, isOpen: false }));
            }
        }));
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
            return;
        }
        const rules = formData.get("rules") as string;
        const terms = formData.get("terms") as string;
        if (!rules || !terms) {
            setError("Por favor, acepta las reglas y los términos y condiciones.");
            return;
        }
        const body = {
            user_name: userName,
            email: email,
            password: password,
            nacionality: nationality,
            gender: gender,
            phoneNumber: phoneNumber
        }
        try {
            await register(body);
            setModalProps(props => ({ ...props, isLoading: false, message: 'Registered successfully' }));
        } catch (err) {
            setError((err as Error).message)
            setModalProps(props => ({ ...props, isLoading: false, message: 'Error registering' }));
        }


    };

    return (
        <>
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
                            <Select options={GENDER_OPTIONS} label="Gender" name="gender" />
                            <Input label="Phone Number" type="tel" placeholder="Phone Number" required name="phoneNumber" />
                            <Input label="E-mail" type="email" placeholder="Enter your e-mail" required name="email" />
                            <Input label="Password" type="password" placeholder="Enter your password" required name="password" />
                            <Rule rule={RULE_TEXT} title="Rules" important name={"rules"} />
                            <Rule title={TERMS_AND_CONDITIONS_TEXT} labelUrl="/home" name={"terms"} />

                            <p className={styles.registerLink}>
                                Do you already have an account?
                                <Link href="/login" className={styles.link}> Here</Link>
                            </p>

                            <a href="/" className={styles.benefitsSection}>Do you want to see your benefits when registering on our platform?</a>

                            <Button text="Confirmar" type="submit" className={styles.submitButton} />
                        </form>
                    </div>
                </main>
                <Footer />
            </div>
            <AlertModal {...modalProps} />
        </>
    );
}
