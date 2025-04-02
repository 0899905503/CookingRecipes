import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookingtoolService } from '../../../../Service/CookingTool/cookingtool.service';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';

@Component({
  selector: 'app-create-instruction',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-instruction.component.html',
  styleUrl: './create-instruction.component.scss',
})
export class CreateInstructionComponent {
  instructions = [{ title: '', step: 1, text: '', cookingToolId: '' }];
  currentStep = 2;

  addInstruction() {
    this.instructions.push({
      title: '',
      step: this.currentStep,
      text: '',
      cookingToolId: '',
    });
    this.currentStep++;
  }

  Cookingtool: any[] = [];

  constructor(
    private cookingtoolService: CookingtoolService,
    private createRecipeDataService: CreateRecipeDataService
  ) {}

  ngOnInit(): void {
    this.onGetAllCookingTool();
  }

  onGetAllCookingTool(): void {
    this.cookingtoolService.getAllCookingTools().subscribe(
      (data) => {
        this.Cookingtool = data;
      },
      (error) => {
        console.error('Error fetching ingredients:', error);
      }
    );
  }

  updateInstruction() {
    const instructionData = this.instructions.map((instruction) => ({
      name: instruction.title,
      step: instruction.step,
      text: instruction.text,
      cookingToolId: instruction.cookingToolId,
    }));

    console.log('Updating recipe ninstructions:', instructionData);

    // Update via service
    this.createRecipeDataService.updateInstructions(
      'Instructions',
      instructionData
    );
  }
  logInstructions() {
    console.log('Current instructions:', this.instructions);
  }
}
