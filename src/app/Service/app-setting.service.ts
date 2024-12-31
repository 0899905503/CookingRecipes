import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { AppSettingModel } from '../Model/app-setting.model';

@Injectable({
  providedIn: 'root',
})
export class AppSettingService {
  private readonly httpClient = inject(HttpClient);
  _setting: AppSettingModel = new AppSettingModel();
  private readonly _settingSubject = new BehaviorSubject<AppSettingModel>(
    new AppSettingModel()
  );

  settings$ = this._settingSubject.asObservable();

  async getSettings(): Promise<void> {
    this._setting = await lastValueFrom(
      this.httpClient.get<AppSettingModel>('assets/settings/app-settings.json')
    );
    this._settingSubject.next(this._setting);
  }

  get setting(): AppSettingModel {
    return this._setting;
  }
}
