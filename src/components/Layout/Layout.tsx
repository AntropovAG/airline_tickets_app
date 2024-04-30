import styles from './layout.module.css'
import Filters from '../Filters/Filters'
import SortingList from '../SortingList/SortingList'
import ItemsList from '../ItemsList/ItemsList'
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function Layout() {
    const filteredTickets = useSelector((state) => state.tickets.filteredTickets);
    const [displayCount, setDisplayCount] = useState(3);
    const displayedTickets = filteredTickets.slice(0, displayCount);

    const loadMore = () => {
        setDisplayCount(prevCount => Math.min(prevCount + 3, filteredTickets.length))
    }

    return (
        <div className={styles.container}>
            <div className={styles.filtersMenu}>
                <Filters />
            </div>
            <div className={styles.displayContainer}>
                <SortingList />
                <ItemsList displayedTickets={displayedTickets}/>
                {displayCount < filteredTickets.length && <LoadMoreButton handleClick={loadMore} />}
            </div>
        </div>
    )
}
