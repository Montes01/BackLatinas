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
import { isEmail, isPhoneNumber } from "../../../helpers/validators";

export default function CreateClient() {
    const [checkedRules, setCheckedRules] = useState({
        rules: false,
        terms: false,
    });

    const initialModalProps = {
        isOpen: false,
        isLoading: false,
        message: '',
        onOk: () => { },
    } as AlertModalProps;

    const [modalProps, setModalProps] = useState(initialModalProps);

    const showModal = (message: string, loading: boolean = false) => {
        setModalProps({
            isLoading: loading,
            message,
            onOk: () => setModalProps(initialModalProps),
            isOpen: true,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        showModal('Registering', true);

        const formData = new FormData(e.target as HTMLFormElement);
        const userName = formData.get("userName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const nationality = formData.get("nationality") as string;
        const gender = formData.get("gender") as string;
        const phoneNumber = formData.get("phoneNumber") as string;

        if (!userName || !email || !password || !nationality || !gender || !phoneNumber) {
            return showModal('Please fill all the fields');
        }

        if (!isEmail(email)) {
            return showModal('Please enter a valid email');
        }

        if (!isPhoneNumber(phoneNumber)) {
            return showModal('Please enter a valid phone number');
        }

        if (!checkedRules.rules || !checkedRules.terms) {
            return showModal('Please accept the rules and terms');
        }

        const body = {
            user_name: userName,
            email,
            password,
            nationality,
            gender,
            phoneNumber,
        };

        try {
            await register(body);
            showModal('Registered successfully', false);
        } catch (err) {
            showModal('Error registering', false);
        }
    };


    return (
        <>
            <div className={styles["create-client-page"]}>
                <Header />
                <main className={styles["create-client-page__main"]}>
                    <BackButton />
                    <div className={styles["create-client-page__login-container"]}>
                        <h2 className={styles["create-client-page__title"]}>
                            Sign Up
                        </h2>
                        <form onSubmit={handleSubmit} className={styles["create-client-page__form"]}>
                            <Input label="User Name" type="text" placeholder="Enter your user name" name="userName" />
                            <Input label="Nationality" type="text" placeholder="Enter your nationality" name="nationality" />
                            <Select options={GENDER_OPTIONS} label="Gender" name="gender" />
                            <Input label="Phone Number" type="tel" placeholder="+1 123 456 7890" name="phoneNumber" />
                            <Input label="E-mail" type="email" placeholder="Enter your e-mail" name="email" />
                            <Input label="Password" type="password" placeholder="Enter your password" name="password" />
                            <Rule rule={RULE_TEXT} title="Rules" important name="rules" onChange={(e) => setCheckedRules(prev => ({ ...prev, rules: e }))} />
                            <Rule title={TERMS_AND_CONDITIONS_TEXT} labelUrl="/home" name="terms" onChange={(e) => setCheckedRules(prev => ({ ...prev, terms: e }))} />

                            <p className={styles["create-client-page__register-link"]}>
                                Do you already have an account?
                                <Link href="/login" className={styles["create-client-page__link"]}>
                                    Here
                                </Link>
                            </p>

                            <a href="/" className={styles["create-client-page__benefits-section"]}>
                                Do you want to see your benefits when registering on our platform?
                            </a>

                            <Button text="Confirmar" type="submit" className={styles["create-client-page__submit-button"]} />
                        </form>
                    </div>
                </main>
                <Footer />
            </div>

            <AlertModal {...modalProps} />
        </>
    );
}
