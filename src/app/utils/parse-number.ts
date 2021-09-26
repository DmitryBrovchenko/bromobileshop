export function parseNumber(value: number | string): number {
    if (value || value === 0) {
        return typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
    }
    return null;
}