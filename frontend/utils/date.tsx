/**
 * Parse the date value to YYYY-MM-dd format
 */
export function dateParser (dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear()
    let day = date.getDate()
    let month = date.getMonth() + 1
    if(month <= 9)
        month = `0${month}`
    if(day <= 9)
        day = `0${day}`
    return `${year}-${month}-${day}`;
}