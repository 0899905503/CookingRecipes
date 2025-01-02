import { Component } from '@angular/core';
import { CreateIngredientComponent } from '../../Shared/Component/CreateRecipes/create-ingredient/create-ingredient.component';
import { CreateNutrientComponent } from '../../Shared/Component/CreateRecipes/create-nutrient/create-nutrient.component';
import { CreateInstructionComponent } from '../../Shared/Component/CreateRecipes/create-instruction/create-instruction.component';
import { CreateCookingtipComponent } from '../../Shared/Component/CreateRecipes/create-cookingtip/create-cookingtip.component';
import { CreateDetailsComponent } from '../../Shared/Component/CreateRecipes/create-details/create-details.component';
import { CreateCookingtoolComponent } from '../../Shared/Component/CreateRecipes/create-cookingtool/create-cookingtool.component';
import { CreateDescriptionComponent } from '../../Shared/Component/CreateRecipes/create-description/create-description.component';
import { CreateUploadimageComponent } from '../../Shared/Component/CreateRecipes/create-uploadimage/create-uploadimage.component';
import { CreateNameComponent } from '../../Shared/Component/CreateRecipes/create-name/create-name.component';
import { CreateSaveComponent } from '../../Shared/Component/CreateRecipes/create-save/create-save.component';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    CreateSaveComponent,
    CreateUploadimageComponent,
    CreateIngredientComponent,
    CreateNutrientComponent,
    CreateInstructionComponent,
    CreateCookingtipComponent,
    CreateDetailsComponent,
    CreateCookingtoolComponent,
    CreateDescriptionComponent,
    CreateNameComponent,
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {}
