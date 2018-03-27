import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ChatService} from '../../../services/chat.service';
import {TrajetEnt} from '../../../class/TrajetEnt';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    providers: [ChatService]
})
export class ChatComponent implements OnInit {
    idTrajet : number;
    offre : TrajetEnt;
    messages : {id:number, message:string, auteur:string, date:string}[];
    messageToSend : string;

    constructor(private route: ActivatedRoute, private location: Location, private chatService: ChatService) {
        this.idTrajet = +this.route.snapshot.paramMap.get('id');
        this.messageToSend = '';
        this.offre = new TrajetEnt(this.idTrajet, '', '', new Date(), '', 0);
    }

    ngOnInit() {

        this.chatService.getInfoTrajet(this.idTrajet).subscribe((result: TrajetEnt) => {
            this.offre = result['offre'];
        });

        this.chatService.getMessages(this.idTrajet, 0).subscribe((result: string) => {
            this.messages = result['messages'];
            this.updateChat();
            this.setScrollBarBottom();
        });

    }

    updateChat(){
        if(this.messages.length > 0){
            var lastMessageId = this.messages[this.messages.length-1].id;

            this.chatService.getLastMessagesById(this.idTrajet, lastMessageId).subscribe((result: string) => {
                var newmessages = result['messages'];

                for(var i = 0; i < newmessages.length; i++){
                    this.messages.push(newmessages[i]);
                }
            });

            setTimeout(this.updateChat.bind(this), 2000);
        }
        else {
            this.ngOnInit();
        }
    }

    setScrollBarBottom(){
        let myDiv = document.getElementById("chatPanel");
        myDiv.scrollTop = myDiv.scrollHeight;
        setTimeout(this.setScrollBarBottom.bind(this), 100);
    }

    sendMessage(){
        if(this.messageToSend != ""){
            this.chatService.setMessage(this.idTrajet, this.messageToSend).subscribe((result: Response) => { });
            this.messageToSend = "";
        }
    }

}
