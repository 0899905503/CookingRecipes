import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private hubConnection!: signalR.HubConnection;

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/recipeHub', {
        accessTokenFactory: () => localStorage.getItem('token') ?? '',
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch((err) => console.error('SignalR Error', err));
  }

  onRecipeStatusChanged(callback: (data: any) => void) {
    this.hubConnection.on('RecipeStatusChanged', callback);
  }

  onRecipeDeleted(callback: (data: any) => void) {
    this.hubConnection.on('RecipeDeleted', callback);
  }
}
