import styles from './header.module.css';

export default function Header() {
    return (
        <div className={styles.container}>
            <img className={styles.img} src="./logo.png" alt="logo" />
            <h1 className={styles.title}>Поиск авиабилетов</h1>
        </div>
    )
}
