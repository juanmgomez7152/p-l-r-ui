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
}
