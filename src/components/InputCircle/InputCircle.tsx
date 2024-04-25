import styles from './inputCircle.module.css';

interface InputCircleProps {
    array: {
        name: string;
        value: string;
    }[];
}

export default function InputSquare({ array }: InputCircleProps) {
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