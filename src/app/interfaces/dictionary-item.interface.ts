export interface DictionaryItem {
  name: string; // transliterated item name with removed special characters (ucenka)
  origin: string; // item name as it appears in the source data (09. Уценка)
  structure: string; // item name without top level number (Уценка)
}
