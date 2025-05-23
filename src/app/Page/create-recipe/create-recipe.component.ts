import { title } from 'process';
import { Component } from '@angular/core';
import { CreateIngredientComponent } from '../../Shared/Component/CreateRecipes/create-ingredient/create-ingredient.component';
import { CreateInstructionComponent } from '../../Shared/Component/CreateRecipes/create-instruction/create-instruction.component';
import { CreateRecipetipComponent } from '../../Shared/Component/CreateRecipes/create-recipetip/create-recipetip.component';
import { CreateDetailsComponent } from '../../Shared/Component/CreateRecipes/create-details/create-details.component';
import { CreateCookingtoolComponent } from '../../Shared/Component/CreateRecipes/create-cookingtool/create-cookingtool.component';
import { CreateDescriptionComponent } from '../../Shared/Component/CreateRecipes/create-description/create-description.component';
import { CreateUploadimageComponent } from '../../Shared/Component/CreateRecipes/create-uploadimage/create-uploadimage.component';
import { CreateNameComponent } from '../../Shared/Component/CreateRecipes/create-name/create-name.component';
import { CreateSaveComponent } from '../../Shared/Component/CreateRecipes/create-save/create-save.component';
import { RecipeTipComponent } from '../../Shared/Component/recipe-tip/recipe-tip.component';
import { CreateRecipeDataService } from '../../Service/CreateRecipeData/create-recipe-data.service';
import { CreateRecipeService } from './../../Service/CreateRecipe/create-recipe.service';
import { CreateNutrientComponent } from '../../Shared/Component/CreateRecipes/create-nutrient/create-nutrient.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    CreateSaveComponent,
    CreateUploadimageComponent,
    CreateIngredientComponent,
    CreateNutrientComponent,
    CreateInstructionComponent,
    CreateRecipetipComponent,
    CreateDetailsComponent,
    CreateCookingtoolComponent,
    CreateDescriptionComponent,
    CreateNameComponent,
    RecipeTipComponent,
    TranslateModule,
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  constructor(
    private createRecipeDataService: CreateRecipeDataService,
    private createRecipeService: CreateRecipeService
  ) {}

  Description = 'Description';
  DescriptionVI = 'DescriptionVI';
  TitleENG = 'Title';
  TitleVIE = 'TitleVI';

  userRole: string = '';

  async saveRecipe() {
    const recipeData = this.createRecipeDataService.getRecipeData();

    const tools = this.createRecipeDataService.getRecipeTool() || [];
    const ingredients =
      this.createRecipeDataService.getRecipeIngredient() || [];
    const nutrients = this.createRecipeDataService.getRecipeNutrient() || [];
    const instructions = this.createRecipeDataService.getInstructions() || [];
    const tips = this.createRecipeDataService.getRecipeTips() || [];

    console.table({ tools, ingredients, nutrients, instructions, tips });

    try {
      const response: any = await this.createRecipeService
        .createRecipe(recipeData)
        .toPromise();
      console.log('📥 Response từ server:', response);

      const recipeId = response?.data?.recipeId;

      if (!recipeId) {
        console.error('❌ Không nhận được recipeId từ server:', response);
        return;
      }

      await this.saveAllRecipeData(
        recipeId,
        tools,
        ingredients,
        nutrients,
        instructions,
        tips
      );

      console.log(
        '✅ Recipe và toàn bộ dữ liệu liên quan đã được lưu thành công!'
      );
    } catch (error) {
      console.error('❌ Lỗi tạo công thức chính:', error);
    }
  }

  private async saveAllRecipeData(
    recipeId: number,
    tools: any[],
    ingredients: any[],
    nutrients: any[],
    instructions: any[],
    tips: any[]
  ) {
    try {
      await Promise.all([
        this.saveRecipeTools(recipeId, tools),
        this.saveRecipeIngredients(recipeId, ingredients),
        this.saveNutrients(recipeId, nutrients),
        this.saveInstructions(recipeId, instructions),
        this.saveRecipeTips(recipeId, tips),
      ]);
      console.log('✅ Tất cả dữ liệu đã được lưu!');
    } catch (error) {
      console.error('❌ Một số phần dữ liệu bị lỗi khi lưu:', error);
    }
  }

  private async saveRecipeTools(recipeId: number, tools: any[]) {
    if (!tools.length) {
      console.warn('⚠️ Không có công cụ nấu ăn để lưu.');
      return;
    }

    const toolData = tools.map((t) => ({
      recipeId,
      cookingToolId: t.cookingToolId,
    }));

    console.table(toolData);

    try {
      await this.createRecipeService.addRecipeTool(toolData).toPromise();
      console.log('✅ Recipe tools đã được lưu.');
    } catch (error) {
      console.error('❌ Lỗi lưu recipe tools:', error);
    }
  }

  async saveRecipeIngredients(recipeId: number, ingredients: any[] = []) {
    if (!ingredients || ingredients.length === 0) {
      console.warn('No ingredients to save.');
      return;
    }

    // Kiểm tra và lọc các giá trị null, undefined hoặc rỗng
    const validIngredients = ingredients.filter(
      (ingredient) =>
        ingredient &&
        ingredient.ingredientId &&
        ingredient.quantity &&
        ingredient.ingredientId !== '' &&
        ingredient.quantity !== ''
    );

    if (validIngredients.length === 0) {
      console.warn('No valid ingredients to save.');
      return;
    }

    const ingredientData = validIngredients.map((ingredient) => ({
      recipeId,
      ingredientId: ingredient.ingredientId,
      quantity: ingredient.quantity,
    }));

    console.log('Sending Recipe Ingredients:', ingredientData);

    try {
      await this.createRecipeService
        .addRecipeIngredient(ingredientData)
        .toPromise();
      console.log('Recipe ingredients saved successfully.');
    } catch (error) {
      console.error('Error saving recipe ingredients:', error);
    }
  }

  private async saveNutrients(recipeId: number, nutrients: any[]) {
    if (!nutrients || nutrients.length === 0) {
      console.warn('⚠️ Không có chất dinh dưỡng để lưu.');
      return;
    }

    // Kiểm tra và lọc các giá trị null, undefined hoặc rỗng
    const validNutrients = nutrients.filter(
      (nutrient) =>
        nutrient &&
        nutrient.nutrientTypeId &&
        nutrient.quantity &&
        nutrient.nutrientTypeId !== '' &&
        nutrient.quantity !== ''
    );

    if (validNutrients.length === 0) {
      console.warn('No valid nutrients to save.');
      return;
    }

    const nutrientData = validNutrients.map((n) => ({
      recipeId,
      nutrientTypeId: n.nutrientTypeId,
      quantity: n.quantity,
    }));

    console.log('Sending Recipe Nutrients:', nutrientData);

    try {
      await this.createRecipeService
        .addRecipeNutrient(nutrientData)
        .toPromise();
      console.log('✅ Recipe nutrients đã được lưu.');
    } catch (error) {
      console.error('❌ Lỗi lưu recipe nutrients:', error);
    }
  }

  private async saveInstructions(
    recipeId: number,
    instructions: any[]
  ): Promise<void> {
    if (!instructions || instructions.length === 0) {
      console.warn('⚠️ Không có hướng dẫn để lưu.');
      return;
    }

    // Kiểm tra và lọc các giá trị null, undefined hoặc rỗng
    const validInstructions = instructions.filter(
      (instruction) =>
        instruction &&
        instruction.stepNumber &&
        instruction.instructionText &&
        instruction.title &&
        instruction.titleVI &&
        instruction.instructionTextVI &&
        instruction.title !== '' &&
        instruction.stepNumber !== '' &&
        instruction.instructionText !== '' &&
        instruction.titleVI !== '' &&
        instruction.instructionTextVI !== ''
    );

    if (validInstructions.length === 0) {
      console.warn('⚠️ Không có hướng dẫn hợp lệ để lưu.');
      return;
    }

    const instructionsData = validInstructions.map((i) => ({
      recipeId,
      stepNumber: i.stepNumber,
      instructionText: i.instructionText,
      instructionTextVI: i.instructionTextVI,
      cookingToolId: i.cookingToolId,
      title: i.title,
      titleVI: i.titleVI,
    }));

    console.log('📤 Sending Recipe Instructions:', instructionsData);

    try {
      await this.createRecipeService
        .addRecipeInstruction(instructionsData)
        .toPromise();
      console.log('✅ Recipe instructions đã được lưu.');
    } catch (error) {
      console.error('❌ Lỗi lưu recipe instructions:', error);
    }
  }

  private async saveRecipeTips(recipeId: number, tips: any[]): Promise<void> {
    if (!tips || tips.length === 0) {
      console.warn('⚠️ Không có mẹo công thức để lưu.');
      return;
    }

    // Kiểm tra và lọc các giá trị null, undefined hoặc rỗng
    const validTips = tips.filter(
      (tip) =>
        tip &&
        tip.actionType &&
        tip.actionText &&
        tip.actionTextVI &&
        tip.titleVI &&
        tip.title &&
        tip.actionType !== '' &&
        tip.actionText !== '' &&
        tip.title !== '' &&
        tip.actionTextVI !== '' &&
        tip.titleVI !== ''
    );

    if (validTips.length === 0) {
      console.warn('⚠️ Không có mẹo hợp lệ để lưu.');
      return;
    }

    const recipeTipData = validTips.map((t) => ({
      recipeId,
      actionType: t.actionType,
      actionTextVI: t.actionTextVI,
      actionText: t.actionText,
      title: t.title,
      titleVI: t.titleVI,
    }));

    console.log('📤 Sending Recipe Tips:', recipeTipData);

    try {
      await this.createRecipeService.addRecipeTip(recipeTipData).toPromise();
      console.log('✅ Recipe tips đã được lưu.');
    } catch (error) {
      console.error('❌ Lỗi lưu recipe tips:', error);
    }
  }
}
