function formatDuration(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = end - start; 

    const hours = Math.floor(diff / 3600000); 
    const minutes = Math.floor((diff % 3600000) / 60000); 

    return `${hours} ч ${minutes} мин`;
}

function sortByDuration(tickets) {
    return tickets.sort((a, b) => {
        const durationA = new Date(a.endTime) - new Date(a.startTime);
        const durationB = new Date(b.endTime) - new Date(b.startTime);
        return durationA - durationB;
    });
}

function formatPrice(price) {
    return new Intl.NumberFormat("ru-RU").format(price);
}

const formatConnectionsInfo = (number) => {
    if (number === 0) return `Без пересадок`;
    if (number === 1) return `${number} пересадка`;
    if (number > 1 && number < 5) return `${number} пересадки`;
    return `${number} пересадок`;
}

const getAirlineImage = (company) => {
    switch (company) {
        case 'UNA': return './public/unsanctioned_logo.png';
        case 'WBA': return './public/willbreak_logo.png';
        case 'SAA': return './public/sanctioned_logo.png';
        default: return './public/logo.png';
    }
}

export { formatDuration, sortByDuration, formatPrice, formatConnectionsInfo, getAirlineImage};