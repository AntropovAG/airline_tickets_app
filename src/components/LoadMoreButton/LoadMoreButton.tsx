import styles from './loadMoreButton.module.css';

interface LoadMoreButtonProps {
    handleClick: () => void;
}

export default function LoadMoreButton({ handleClick }: LoadMoreButtonProps) {
    return (
        <button className={styles.button} onClick={handleClick}>
            Загрузить ещё билеты
        </button>
    )
}
