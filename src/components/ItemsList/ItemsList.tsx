import styles from './itemsList.module.css';
import Item from '../Item/Item';
import {fetchTickets} from '../../redux/ticketsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {sortByPrice, sortTickets} from '../../redux/ticketsSlice.js';
// import {ticketsAdapter} from '../../redux/ticketsSlice.js';
// import {sortByConnections} from '../../redux/ticketsSlice.js';

// const selectTicketEntities = ticketsAdapter.getSelectors((state) => state.tickets);

export default function ItemsList() {
    const dispatch = useDispatch();
    // const tickets = useSelector(selectTicketEntities.selectAll);

    const filteredTickets = useSelector((state) => state.tickets.filteredTickets);

    // const handleClick = () => {
    //     dispatch(sortByConnections());
    // }


    useEffect(() => {
        console.log(filteredTickets)
    }, [filteredTickets])

    useEffect(() => {
        dispatch(fetchTickets()).finally(() => {dispatch(sortTickets());});
    }, [dispatch])

    return (
        <div className={styles.container}>
            {filteredTickets!==undefined && filteredTickets.length>0?(filteredTickets.map((ticket) => {
                return <Item key={ticket.id} ticket={ticket} />
            })):"Не найдено билетов"}
        </div>
    )
}
