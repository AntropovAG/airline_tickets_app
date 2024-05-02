import styles from './item.module.css';
import {formatDuration, formatPrice, formatConnectionsInfo, getAirlineImage} from '../../../utils/supportFunctions.js';

export default function Item({ticket}) {
    const {company, connectionAmount, from, to, startTime, endTime, price} = ticket;


    return (
        <div className={styles.container}>
            <div className={styles.priceContainer}>
                <p className={styles.price}>{formatPrice(price)} P</p>
                <img className={styles.img} src={getAirlineImage(company)} alt={company} />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.wrapper}>
                    <p className={styles.title}>{`${from} - ${to}`}</p>
                    <p className={styles.value}>10:00 - 11:00</p>                    
                </div>
                <div className={styles.wrapper}>
                    <p className={styles.title}>В пути</p>
                    <p className={styles.value}>{formatDuration(startTime, endTime)}</p>
                </div>
                <div className={styles.wrapper}>
                    <p className={styles.title}>Пересадки</p>
                    <p className={styles.value}>{formatConnectionsInfo(connectionAmount)}</p>
                </div>
            </div>
        </div>
    )
}
