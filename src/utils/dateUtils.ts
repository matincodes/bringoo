// src/utils/dateUtils.ts

export function formatDate(): string {
    const date = new Date();
    
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayName: string = days[date.getDay()];
    const day: number = date.getDate();
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();

    const ordinalSuffix = (n: number): string => {
        const s = ["th", "st", "nd", "rd"],
              v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${dayName}, ${ordinalSuffix(day)} ${month}, ${year}`;
}
