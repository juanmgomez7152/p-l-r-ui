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

    this.service.translateMessage(this.userMessage).subscribe((response: any) => {
      let parsedResponse = JSON.parse(response);
      this.responseMessage = parsedResponse.answer;
      console.log(this.responseMessage);

      this.messagesList[this.messagesList.length - 1].responseMessage = this.responseMessage;

      this.showLoader = false;
      this.userMessage =this.responseMessage="";
    }, (error) => {
      console.error(error);
      this.showLoader = false;
    });
    
  }
  
  test() {
    this.service.test().subscribe((response: any) => {
      console.log(response);
    });
  }

  deleteMessages() {
    this.service.deleteHistory().subscribe(()=> {
      console.log("History deleted");
      this.messagesList = [];
    });
  }
}