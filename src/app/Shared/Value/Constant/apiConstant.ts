export const ApiPaths = {
  baseUrl: 'http://localhost:5099/api/v1/',
  baseAuthUrl: 'http://localhost:5099/api/Auth/',
  //Recipe
  GetAllRecipe: 'Recipe/Get-all-recipe',
  GetByIdRecipe: 'Recipe/Get-recipe-by-id/',
  GetTopView: 'Recipe/Get-recipe-top-view',
  GetNewRecipe: 'Recipe/Get-new-recipe',
  CreateRecipe: 'Recipe/create-recipe',
  GetSimilar: 'Recipe/Get-similar-recipe/',
  UpdateRecipe: 'Recipe/Update/',
  DeleteRecipe: 'Recipe/Delete/',

  //Recipe Ingredient

  GetAllIngredient: 'Ingredient/Get-all-ingredient',

  //Tip
  GetAllTip: 'CookingTip/Get-all-cookingtip',
  GetByIdTip: 'CookingTip/Get-cookingtip-by-id/',

  //User
  Register: 'register',

  //Cooking Tip
  GetByIdCookingTip: 'CookingTip/Get-cookingtip-by-id/',

  //Cooking Tool
  GetAllCookingTool: 'CookingTool/Get-all-cookingtool',

  //Nutrient
  GetAllNutrient: 'NutrientType/Get-all-nutrient',

  //Instruction
  CreateInstruction: 'Instruction/create-instruction',

  //RecipeTip
  CreateRecipeTip: 'RecipeTip/create-recipe-tip',

  //Recipe ingredient
  CreateRecipeIngredient: 'RecipeIngredient/create-recipe-ingredient',

  //Recipe tool
  CreateRecipeTool: 'RecipeTool/create-recipe-tool',

  //Recipe Nutrient
  CreateRecipeNutrient: 'RecipeNutrient/create-recipe-nutrient',

  //Favorite Recipe
  GetFavoriteRecipeByUserId: 'Favorite/get-favorites-by-user-id/',
  CreateFavoriteRecipe: 'Favorite/create-favorite',
  DeleteFavoriteRecipe: 'Favorite/delete-favorite',
  CheckFavoriteRecipe: 'Favorite/check-favorite',

  //Comment
  GetAllComment: 'Comment/get-all-comments',
  GetCommentByRecipeId: 'Comment/get-comments-by-recipe-id/',
  CreateComment: 'Comment/create-comment',

  //Auth
  SendOtp: 'send-otp-email',
  VerifyOtp: 'verify-otp',
  ResetPassword: 'reset-password',
};
