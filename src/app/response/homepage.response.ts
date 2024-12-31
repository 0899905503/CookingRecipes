import { RecipeModel } from '../Model/recipe.model';
import { ApiResponse } from './api.response';

export class RecipeResponse extends ApiResponse {
  override result: RecipeModel;

  constructor() {
    super();
    this.result = new RecipeModel();
  }
}
