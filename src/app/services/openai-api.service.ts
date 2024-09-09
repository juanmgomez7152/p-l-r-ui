import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {

  constructor(private http :HttpClient) { }
  
  public test() {    
    return this.http.get(environment.apiUrl + '/translation/hello');
  }

  public translateMessage(userMessage: string) {
    return this.http.post<any>(environment.apiUrl + '/translation/send-message/', { message: userMessage });
  }

  public deleteHistory() {
    return this.http.delete(environment.apiUrl + '/translation/delete-history')
  }
}
