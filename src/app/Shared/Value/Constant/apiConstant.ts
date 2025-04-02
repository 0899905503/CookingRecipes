export const ApiPaths = {
  baseUrl: 'http://localhost:5099/api/v1/',
  //Recipe
  GetAllRecipe: 'Recipe/Get-all-recipe',
  GetByIdRecipe: 'Recipe/Get-recipe-by-id/',
  GetTopView: 'Recipe/Get-recipe-top-view',
  GetNewRecipe: 'Recipe/Get-new-recipe',
  CreateRecipe: 'Recipe/create-recipe',

  //Recipe Ingredient
  GetSimilar: 'RecipeIngredient/Get-similar-recipe/',
  GetAllIngredient: 'Ingredient/Get-all-ingredient',

  //Tip
  GetAllTip: 'CookingTip/Get-all-cookingtip',
  GetByIdTip: 'CookingTip/Get-cookingtip-by-id/',

  //User
  CreateUser: 'User/Create-user',

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
};
