import { CatalogueItem } from "./catalogue-item.interface";
import { PageParamsInterface } from "./page-params.interface";

export interface PageData {
  goods: CatalogueItem[],
  hierarchy: any,
  categoryOne: string,
  categoryOneSource: string
  categoryTwo?: string,
  categoryTwoSource?: string
  categoryThree?: string,
  categoryThreeSource?: string
  categoryFour?: string,
  categoryFourSource?: string
}
export interface SourceData {
    data: PageData;
    queryParams: PageParamsInterface;
}