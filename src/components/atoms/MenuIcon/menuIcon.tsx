//button props
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
}

import styles from './menuIcon.module.scss';

export const IconMenu = ({ ...props }: Props) => {
    
    return (
        <button className={styles.menuIcon} {...props}>
            <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="2em"
                width="2em"
            >
                <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z" />
            </svg>
        </button>
    );
}