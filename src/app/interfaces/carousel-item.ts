export interface CarouselItem {
    id: number;
    description: string;
    downloadUrl: string;
    path: string;
}

export interface CarouselAdminItem extends CarouselItem {
  dbKey: string;
}

export interface CarouselEditItem {
  dbKey: string;
  id: number;
  description: string;
  image: File;
}