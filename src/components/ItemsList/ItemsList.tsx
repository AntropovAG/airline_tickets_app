import styles from './itemsList.module.css';
import Item from '../Item/Item';
import {fetchTickets} from '../../redux/ticketsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {ticketsAdapter} from '../../redux/ticketsSlice.js';
import {sortByConnections} from '../../redux/ticketsSlice.js';

const selectTicketEntities = ticketsAdapter.getSelectors((state) => state.tickets);

export default function ItemsList() {
    const dispatch = useDispatch();
    const tickets = useSelector(selectTicketEntities.selectAll);

    const handleClick = () => {
        dispatch(sortByConnections());
    }

    useEffect(() => {
        console.log(tickets)
    }, [tickets])

    useEffect(() => {
        dispatch(fetchTickets())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <button onClick={handleClick}></button>
            {tickets!==undefined && tickets.length>0?(tickets.map((ticket) => {
                return <Item key={ticket.id} ticket={ticket} />
            })):"Не найдено билетов"}
        </div>
    )
}
