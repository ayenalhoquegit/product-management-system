import Category from "../models/category.interface";

export class CoreUtils {
  static findAllCategoriesId(
    categories: Category[],
    parentCategoryId?: number,
    categorisIds: number[] = []
  ): number[] {
    categories.forEach((category: Category) => {
      if (category.parent_id === parentCategoryId) {
        categorisIds.push(Number(category?.id));
        this.findAllCategoriesId(categories, category.id, categorisIds);
      }
    });
    return categorisIds;
  }
}
