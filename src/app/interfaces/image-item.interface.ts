export interface ImageItem {
    id: string;
    path: string; 
    downloadUrl?: string;
}

export interface ImageAdminItem extends ImageItem {
  dbKey: string;
}