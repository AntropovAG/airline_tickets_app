import styles from './itemsList.module.css';
import Item from '../Item/Item';
import {fetchTickets} from '../../redux/ticketsSlice.ts';
import { useAppDispatch } from '../../../utils/hooks.ts';
import { useEffect } from 'react';
import { sortTickets} from '../../redux/ticketsSlice.ts';
import {Ticket} from '../../../utils/interfaces.ts'
// import {ticketsAdapter} from '../../redux/ticketsSlice.js';
// import {sortByConnections} from '../../redux/ticketsSlice.js';

// const selectTicketEntities = ticketsAdapter.getSelectors((state) => state.tickets);

interface ItemsListProps {
    displayedTickets: Ticket[];
}

export default function ItemsList({displayedTickets}: ItemsListProps) {
    const dispatch = useAppDispatch();
    // const tickets = useSelector(selectTicketEntities.selectAll);

    // const handleClick = () => {
    //     dispatch(sortByConnections());
    // }

    useEffect(() => {
        dispatch(fetchTickets()).finally(() => {dispatch(sortTickets());});
    }, [dispatch])

    return (
        <div className={styles.container}>
            {displayedTickets!==undefined && displayedTickets.length>0?(displayedTickets.map((ticket) => {
                return <Item key={ticket.id} ticket={ticket} />
            })):"Не найдено билетов"}
        </div>
    )
}
