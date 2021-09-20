export function parseNumber(value: number | string): number {
    return typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
}