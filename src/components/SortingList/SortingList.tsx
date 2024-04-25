import styles from './sortingList.module.css';

export default function SortingList() {
    return (
        <div className={styles.container}>
            <button className={`${styles.button} ${styles.buttonActive}`}>Самый дешевый</button>
            <button className={styles.button}>Самый быстрый</button>
            <button className={styles.button}>Самый оптимальный</button>
        </div>
    )
}
