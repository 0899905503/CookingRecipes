import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NutrientService } from '../../../../Service/Nutrient/nutrient.service';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-nutrient',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './create-nutrient.component.html',
  styleUrls: ['./create-nutrient.component.scss'],
})
export class CreateNutrientComponent implements OnInit, OnChanges {
  @Input() nutrientsInput: any[] = [];

  @Output() nutrientsChange = new EventEmitter<any[]>();

  Nutrient: any[] = [];
  nutrients = [{ nutrientTypeId: null, quantity: null, unit: null }];

  currentLang: string = 'en';

  constructor(
    private nutrientService: NutrientService,
    private createRecipeDataService: CreateRecipeDataService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  ngOnInit(): void {
    this.onGetAllNutrient();
    if (this.nutrientsInput && this.nutrientsInput.length > 0) {
      this.nutrients = JSON.parse(JSON.stringify(this.nutrientsInput)); // Deep copy
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nutrientsInput'] && changes['nutrientsInput'].currentValue) {
      this.nutrients = JSON.parse(JSON.stringify(this.nutrientsInput));
    }
  }

  onGetAllNutrient(): void {
    this.nutrientService.getAllNuntrients().subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.Nutrient = data;
        } else {
          console.error('API did not return array:', data);
          this.Nutrient = [];
        }
      },
      (error) => {
        console.error('Error fetching nutrients:', error);
      }
    );
  }

  addNutrient() {
    this.nutrients.push({ nutrientTypeId: null, quantity: null, unit: null });
    this.updateRecipeNutrients();
  }

  onNutrientChange(nutrient: any): void {
    // Cập nhật đơn vị khi thay đổi nutrient
    const selected = this.Nutrient.find(
      (item) => item.nutrientTypeId === nutrient.nutrientTypeId
    );
    if (selected) {
      // Gán unit tự động theo nutrient chọn
      nutrient.unit = selected.unit;
    } else {
      nutrient.unit = '';
    }
    this.updateRecipeNutrients();
  }

  getUnit(nutrient: any): string {
    const selected = this.Nutrient.find(
      (item) => item.nutrientTypeId === nutrient.nutrientTypeId
    );
    if (!selected) return '';
    return selected.unit;
  }

  updateRecipeNutrients() {
    const result = this.nutrients.map((nutrient) => ({
      nutrientTypeId: nutrient.nutrientTypeId,
      quantity: nutrient.quantity,
      unit: nutrient.unit,
    }));

    this.createRecipeDataService.updateRecipeNutrient(result);
  }

  onUserInputChange(updatedNutrients: any[]) {
    this.nutrientsChange.emit(updatedNutrients);
  }
}
