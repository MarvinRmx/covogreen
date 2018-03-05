import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
  idTrajet : number;
  messages : {id:number, message:string, auteur:string, date:string}[];
  messageToSend : string;

  constructor(private route: ActivatedRoute, private location: Location, private chatService: ChatService) {
    this.idTrajet = +this.route.snapshot.paramMap.get('id');
    this.messageToSend = "";
  }

  ngOnInit() {
    var result = this.chatService.getMessages(this.idTrajet, 20);
    if(result != null && result.errors.length > 0){
      this.messages = result.massages;

      this.updateChat();
      this.setScrollBarBottom();
    }
  }

  updateChat(){
    var result = this.chatService.getMessages(this.idTrajet, 20);
    if(result != null && result.errors.length > 0){
      var newMassages = result.massages;

      for(var i = 0; i < newMassages.length; i++){
        this.messages.push(newMassages[i]);
      }
    }
    setTimeout(this.updateChat.bind(this), 1000);
  }

  setScrollBarBottom(){
    var myDiv = document.getElementById("chatPanel");
    myDiv.scrollTop = myDiv.scrollHeight;
    setTimeout(this.setScrollBarBottom.bind(this), 100);
  }

  sendMessage(){
    this.chatService.setMessage(this.idTrajet, this.messageToSend);
    this.messageToSend = "";
  }

}
