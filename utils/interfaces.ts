interface Ticket {
    id: number;
    from: string;
    to: string;
    company: string;
    price: number;
    currency: string;
    startTime: string;
    endTime: string;
    date: string;
    connectionAmount: number;
}

export { Ticket };