import { Component, ViewChild, ElementRef } from "@angular/core";
import { OpenAIService } from "../../services/openai-api.service";

@Component({
  selector: "app-translation-chat",
  templateUrl: "./translation-chat.component.html",
})

export class TranslationChatComponent{
  @ViewChild('fileInput') fileInput!: ElementRef;
  messagesList: any[] = [];
  userMessage: string = "";
  mediaMessage: string = "";
  responseMessage: string = "";
  mediaBasedInput: boolean = false;
  showLoader: boolean = false;
  selectedFile: File | null = null;
  
  constructor(private service: OpenAIService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("File submitted.");
    this.sendPicture();
    this.fileInput.nativeElement.value = '';
  }

  sendPicture() {
    if (!this.selectedFile) {
      console.error("No file selected");
      return;
    }

    this.showLoader = true;
    this.service.uploadPicture(this.selectedFile).subscribe((response: any) => {
      this.showLoader = false;
      let parsedResponse = JSON.parse(response);
      this.mediaBasedInput = true;
      this.userMessage = this.mediaMessage =parsedResponse.extracted_text;
      this.selectedFile = null;
    }, (error) => {
      console.error(error);
      this.showLoader = false;
    });
  }

  sendMessage() {
    this.showLoader = true;
    let message = this.userMessage;
    this.userMessage="";
    this.mediaBasedInput = false;
    this.messagesList.push({ userMessage: message});
    this.service.translateMessage(message).subscribe((response: any) => {
      let parsedResponse = JSON.parse(response);
      this.responseMessage = parsedResponse.answer;

      this.messagesList[this.messagesList.length - 1].responseMessage = this.responseMessage;

      this.showLoader = false
      this.mediaMessage = "";
      this.mediaBasedInput = false;
      this.responseMessage="";
    }, (error) => {
      console.error(error);
      this.showLoader = false;
    });
    
  }

  deleteMessages() {
    this.service.deleteHistory().subscribe(()=> {
      console.log("History deleted");
      this.messagesList = [];
    });
  }
}