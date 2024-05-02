import styles from './sortingList.module.css';
import { setSortingType, sortTickets } from '../../redux/ticketsSlice.ts';
import { useDispatch } from 'react-redux';

export default function SortingList() {
    const dispatch = useDispatch();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget as HTMLButtonElement;
        const sortType = target.dataset.sort;
        const buttons = document.querySelectorAll("#sortButton");
        buttons.forEach((button) => {
            button.classList.remove(styles.buttonActive);
        });
        target.classList.add(styles.buttonActive);
        if (sortType && ['price', 'duration', 'optimal'].includes(sortType)) {
            dispatch(setSortingType(sortType as 'price' | 'duration' | 'optimal'));
            dispatch(sortTickets());
        } else {
            console.error('Invalid sort type:', sortType);
        }
    }

    return (
        <div className={styles.container}>
            <button className={`${styles.button} ${styles.buttonActive}`} id='sortButton' data-sort='price' onClick={handleClick}>Самый дешевый</button>
            <button className={styles.button} id='sortButton' data-sort='duration' onClick={handleClick}>Самый быстрый</button>
            <button className={styles.button} id='sortButton' data-sort='optimal' onClick={handleClick}>Самый оптимальный</button>
        </div>
    )
}
