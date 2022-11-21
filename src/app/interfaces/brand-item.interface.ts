export interface BrandItem {
    id: number;
    name: string;
    searchCriteria: string;
    logoUrl: string;
    logoPath: string;
}

export interface BrandAdminItem extends BrandItem {
  dbKey: string;
}

export interface BrandEditItem {
  dbKey: string;
  id: number;
  name: string;
  searchCriteria: string;
  image: File;
}