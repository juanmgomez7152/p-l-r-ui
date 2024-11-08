import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/prod-environment';

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

  public uploadPicture(file: File){
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(environment.apiUrl+"/translation/upload-picture/", formData);
  }

  public deleteHistory() {
    return this.http.delete(environment.apiUrl + '/translation/delete-history')
  }
}
