import styles from './layout.module.css'
import Filters from '../Filters/Filters'
import SortingList from '../SortingList/SortingList'
import ItemsList from '../ItemsList/ItemsList'
import FiltersButton from '../FiltersButton/FiltersButton'
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton'
import { useAppSelector } from '../../../utils/hooks'
import { useState, useEffect } from 'react'

export default function Layout() {
    const filteredTickets = useAppSelector((state) => state.tickets.filteredTickets);
    const [displayCount, setDisplayCount] = useState<number>(3);
    const isWideScreen = () => window.innerWidth > 1080;
    const [openFilters, setOpenFilters] = useState(isWideScreen);
    const displayedTickets = filteredTickets.slice(0, displayCount);

    useEffect(() => {
        const handleResize = () => {
            setOpenFilters(isWideScreen());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const loadMore = () => {
        setDisplayCount(prevCount => Math.min(prevCount + 3, filteredTickets.length))
    }

    const toggleFilters = () => {
        setOpenFilters(prevState => !prevState);
    }

    return (
        <div className={styles.container}>
            <div className={styles.filtersMenu}>
                <FiltersButton handleClick={toggleFilters} openFilters={openFilters} />
                <div className={openFilters ? styles.filtersVisible : styles.filtersHidden}>
                    <Filters setDisplayCount={setDisplayCount} />
                </div>
            </div>
            <div className={styles.sortingList}>
                <SortingList />
            </div>
            <div className={styles.itemsList}>
                <ItemsList displayedTickets={displayedTickets} />
                {displayCount < filteredTickets.length && <LoadMoreButton handleClick={loadMore} />}
            </div>
        </div>
    )
}
