export const timeFormat = {
    formatDate(date: string): [string, number, number] {
        const year = date.slice(0, 4);
        const month = parseInt(date.slice(5, 7));
        const day = parseInt(date.slice(8, 10));

        return [year, month, day];
    },

    getDate(date: string): string {
        const arr = this.formatDate(date);
        return `${arr[1]}월 ${arr[2]}일`;
    },

    inputDate(date: string): string {
        const arr = this.formatDate(date);
        return `${arr[0]}/${arr[1]}/${arr[2]}`;
    }
};
