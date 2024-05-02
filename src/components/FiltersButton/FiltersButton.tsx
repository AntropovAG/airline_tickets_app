import styles from './filtersButton.module.css';
import { useAppSelector } from '../../../utils/hooks.ts';

interface FiltersButtonProps {
    handleClick: () => void;
    openFilters: boolean;
}

export default function FiltersButton({ handleClick, openFilters }: FiltersButtonProps) {
    const displayedFilters = useAppSelector((state) => state.tickets.displayedFilters);

    return (
        <button className={`${styles.button} ${openFilters ? styles.buttonOpen : ''}`} onClick={handleClick}>
            <p className={styles.options}>{displayedFilters.join(", ")}</p>
            <div className={styles.wrapper}>
                <p className={styles.text}>Открыть настройки</p>
                <img className={styles.img} src="./public/open_filters.png" alt="иконка открытия настроек" />
            </div>
        </button>
    )
}
