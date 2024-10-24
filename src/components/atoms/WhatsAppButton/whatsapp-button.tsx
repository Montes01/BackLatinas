import styles from './whatsapp-button.module.scss';
import { WhatsApp } from "@mui/icons-material";

export default function WhatsAppButton({ phoneNumber = "1234567890", message = "Hola! Tengo una pregunta." }) {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['whatsapp-button']}
            aria-label="Chatear por WhatsApp"
        >
            <WhatsApp style={{
                width: '100%',
                height: '100%',
            }} />
        </a>
    );
}
