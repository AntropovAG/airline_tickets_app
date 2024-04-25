import styles from './layout.module.css'
import Filters from '../Filters/Filters'
import SortingList from '../SortingList/SortingList'
import ItemsList from '../ItemsList/ItemsList'
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton'

export default function Layout() {
    return (
        <div className={styles.container}>
            <div className={styles.filtersMenu}>
                <Filters />
            </div>
            <div className={styles.displayContainer}>
                <SortingList />
                <ItemsList />
                <LoadMoreButton />
            </div>
        </div>
    )
}
