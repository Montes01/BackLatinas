
import { MessageCircle } from "lucide-react";
import styles from './whatsapp-button.module.scss'; // Importa los estilos

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
            <MessageCircle size={24} />
        </a>
    );
}
