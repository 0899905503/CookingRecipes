import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookingtoolService } from '../../../../Service/CookingTool/cookingtool.service';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-instruction',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './create-instruction.component.html',
  styleUrl: './create-instruction.component.scss',
})
export class CreateInstructionComponent {
  instructions = [
    { title: '', stepNumber: 1, instructionText: '', cookingToolId: '' },
  ];
  currentStep = 2;

  addInstruction() {
    this.instructions.push({
      title: '',
      stepNumber: this.currentStep,
      instructionText: '',
      cookingToolId: '',
    });
    this.currentStep++;
    this.updateInstruction();
  }

  Cookingtool: any[] = [];
  //translate
  currentLang: string = 'en';

  constructor(
    private cookingtoolService: CookingtoolService,
    private createRecipeDataService: CreateRecipeDataService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

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
      title: instruction.title,
      stepNumber: instruction.stepNumber,
      instructionText: instruction.instructionText,
      cookingToolId: instruction.cookingToolId,
    }));

    console.log('Updating recipe ninstructions:', instructionData);

    // Update via service
    this.createRecipeDataService.updateInstructions(instructionData);
  }
  logInstructions() {
    console.log('Current instructions:', this.instructions);
  }
}
