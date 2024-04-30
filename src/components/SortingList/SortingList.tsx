import styles from './sortingList.module.css';
import { setSortingType, sortTickets } from '../../redux/ticketsSlice';
import { useDispatch } from 'react-redux';

export default function SortingList() {
    const dispatch = useDispatch();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        const buttons = document.querySelectorAll("#sortButton");
        buttons.forEach((button) => {
            button.classList.remove(styles.buttonActive);
        });
        target.classList.add(styles.buttonActive);
        dispatch(setSortingType(target.dataset.sort));
        dispatch(sortTickets());
    }

    return (
        <div className={styles.container}>
            <button className={`${styles.button} ${styles.buttonActive}`} id='sortButton' data-sort='price' onClick={handleClick}>Самый дешевый</button>
            <button className={styles.button} id='sortButton' data-sort='duration' onClick={handleClick}>Самый быстрый</button>
            <button className={styles.button} id='sortButton' data-sort='optimal' onClick={handleClick}>Самый оптимальный</button>
        </div>
    )
}
