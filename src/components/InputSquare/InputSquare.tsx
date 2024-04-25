import styles from './inputSquare.module.css';

interface InputSquareProps {
    array: {
        name: string;
        value: string;
    }[];
}

export default function InputSquare({ array }: InputSquareProps) {
    return (
        <>
            {array.map((item, index) => (
                <label className={styles.label} key={index}>
                    <input type="checkbox" name="пересадки" value={item.value} />
                    <span className={styles.span}></span>
                    {item.name}
                </label>
            ))}
        </>
    )
}
