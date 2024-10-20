export interface AlertModalProps {
    message: string;
    onOk: () => void;
    onCancel?: () => void;
    isOpen: boolean;
    isLoading?: boolean;
}

import { Loader } from '../../atoms/Loader/loader';
import styles from './alertModal.module.scss'

export const AlertModal = ({ message, onOk, isOpen, onCancel, isLoading }: AlertModalProps) => {

    return (
        <dialog open={isOpen} className={styles.modal}>
            <div className={styles.modal__wrapper}>
                <div className={styles.modal__wrapper__content}>
                    <p className={styles.modal__wrapper__content__message}>{message}</p>
                    {isLoading
                        ? <Loader /> :
                        <section className={styles.modal__wrapper__content__buttons}>
                            <button onClick={onOk} className={styles.modal__wrapper__content__buttons__ok}>Ok</button>
                            {onCancel && <button onClick={onCancel} className={styles.modal__wrapper__content__buttons__cancel}>Cancel</button>}
                        </section>
                    }
                </div>
            </div>
        </dialog>
    );
}