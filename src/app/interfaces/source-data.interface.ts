import { CatalogueItem } from "./catalogue-item.interface";
import { PageParamsInterface } from "./page-params.interface";

export interface SourceData {
    data: {
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
      };
      queryParams: PageParamsInterface;
}