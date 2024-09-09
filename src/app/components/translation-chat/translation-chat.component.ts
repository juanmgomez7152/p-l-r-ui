import { Component, OnInit } from "@angular/core";
import { OpenAIService } from "../../services/openai-api.service";

@Component({
  selector: "app-translation-chat",
  templateUrl: "./translation-chat.component.html",
})

export class TranslationChatComponent{
  messagesList: any[] = [];
  userMessage: string = "";
  responseMessage: string = "";
  showLoader: boolean = false;
  
  constructor(private service: OpenAIService) {}

  sendMessage() {
    this.showLoader = true;
    this.messagesList.push({ userMessage: this.userMessage});
    this.userMessage = "";
  }
  
  test() {
    this.service.test().subscribe((response: any) => {
      console.log(response);
    });
  }
}