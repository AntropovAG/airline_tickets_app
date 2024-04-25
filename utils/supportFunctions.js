function formatDuration(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = end - start; 

    const hours = Math.floor(diff / 3600000); 
    const minutes = Math.floor((diff % 3600000) / 60000); 

    return `${hours} ч ${minutes} м`;
}

function sortByDuration(tickets) {
    return tickets.sort((a, b) => {
        const durationA = new Date(a.endTime) - new Date(a.startTime);
        const durationB = new Date(b.endTime) - new Date(b.startTime);
        return durationA - durationB;
    });
}

export { formatDuration, sortByDuration };