import { useEffect, useState } from "react";
import { Header } from "../../molecules/Header/header";
import styles from "./createGirls.module.scss";
import { Footer } from "../../molecules/Footer/footer";
import { PackageResponse, RegisterWomenRequest } from "../../../lib/types/types";
import { getPackages, postGirl } from "../../../lib/services/api";
import { PackageCard } from "../../molecules/PackageCard/packageCard";
import { Input } from "../../atoms/Input/input";
import { BackButton } from "../../molecules/BackButton/backButton";
import { RULE_TEXT, TERMS_AND_CONDITIONS_TEXT } from "../../../lib/constants/registerConstants";
import { Button } from "../../atoms/Button/button";
import { Rule } from "../../atoms/Rule/rule";
import { NavLink } from "react-router-dom";
import { AlertModal, AlertModalProps } from "../../molecules/AlertModal/alertModal";
import { useNavigate } from "react-router-dom";
export default function CreateGirls() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const originalModalProps = {
    isOpen: false,
    message: "Are you sure you want to create the account",
    onOk: () => {
      setModalProps(prev => ({ ...prev, isOpen: true }));
    },
    onCancel: () => {
      setModalProps(prev => ({ ...prev, isOpen: false }));
    },
  };
  const [modalProps, setModalProps] = useState<AlertModalProps>(originalModalProps);
  const [packages, setPackages] = useState([] as PackageResponse[]);
  const [selectedPackageId, setSelectedPackageId] = useState(0);

  const handleSelectPackage = (id: number) => {
    setSelectedPackageId(id);
  }

  useEffect(() => {
    getPackages().then((data) => setPackages(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const userName = formData.get("user_name") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const nationality = formData.get("nationality") as string;
    const idPackage = selectedPackageId;

    if (!name || !userName || !email || !password || !nationality || !phoneNumber || !idPackage) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const body: RegisterWomenRequest = { name, userName, email, phoneNumber, password, idPackage, nationality };
    console.log(body);

    setModalProps(prev => ({
      ...prev,
      isOpen: true,
      onOk: async () => {
        setModalProps(prev => ({ ...prev, isOpen: true, isLoading: true, message: "Creating account", onCancel: undefined }));
        try {
          await postGirl(body);
          setModalProps(prev => ({ ...prev, isOpen: true, isLoading: false, message: "Account Created", onOk: () => navigate("/login"), onCancel: undefined }));
        } catch (err) {
          setModalProps(({
            isOpen: true, isLoading: false, message: "Error creating account", onCancel: undefined, onOk() {
              setModalProps(originalModalProps);
            },
          }));
        }
      },
    }));

  };

  return (
    <div className={styles.loginPage}>
      <Header />
      <main className={styles.large_section_wrapper}>
        <BackButton />
        <div className={styles.content}>

          <h2 className={styles.large_section_wrapper__title}>Sign Up</h2>
          {error && <span className={styles.errorMessage}>{error}</span>}

          <form onSubmit={handleSubmit} className={styles.large_section_wrapper__form}>

            <Input name="name" label="name" placeholder="Your Full Name" required />
            <Input name="user_name" label="User Name" placeholder="User Name" required />
            <Input name="nationality" label="Nationality" placeholder="Enter your nationality" required />
            <Input name="email" label="email" type="email" placeholder="example@domain.com" required />
            <Input name="phone" label="Your phone Number" type="tel" placeholder="Your Phone Number" required />
            <Input name="password" label="password" placeholder="Password" type="password" required />
            <strong className={styles.large_section_wrapper__form__package}>Choose your favourite package</strong>
            {packages &&
              packages.map((pack) => (
                <PackageCard key={pack.idPackage} {...pack} onChange={handleSelectPackage} checked={selectedPackageId === pack.idPackage} />
              ))
            }
            <Rule rule={RULE_TEXT} title="Rules" important name={"rules"} />
            <Rule title={TERMS_AND_CONDITIONS_TEXT} labelUrl="/home" name={"terms"} />

            <p className={styles.large_section_wrapper__form__account}>
              Do you already have an account? Login <NavLink to="/login" className={styles.link}>Here</NavLink>
            </p>

            <NavLink to='/' className={styles.large_section_wrapper__form__benefits}>Do you want to see your benefits when registering on our platform?</NavLink>

            <Button text="Confirmar" type="submit" className={styles.large_section_wrapper__form__confirm} />

          </form>
          <Footer />
        </div>
      </main>
      <AlertModal {...modalProps} />
    </div>
  );
}
