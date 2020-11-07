import { NgContentAst } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatMessage } from '../DTO/MODELS/chat-message';
import { ChatService } from '../services/chat.service';



// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent implements OnInit {

//   constructor(private chatService:ChatService) { }
// idChat:number=0;
// newMsg:string="";
// messages:ChatMessage[]=null;
//   ngOnInit(): void {
//   }
//   @ViewChild ("scrollElement",{static:true}) content : NgContentAst;
//   getMessages() {
//     setInterval(()=> this.chatService.getCommentsById(this.idChat).subscribe(
//       (comments)=>{
//         var len= 0;
//         if(this.messages) 
//         {
//           len = this.messages.length;
//         }
//         var newLen=comments.length;
//         this.messages=comments;
       
//           setTimeout(() => {
//             if(len!= newLen)            
//               this.updateScroll();
//         }, 500);
        
      
//         //this.content.scrollToBottom(0);
//       },
//       (e)=>{}
//     ),500);
// }
// updateScroll() {
//   if (this.content.scrollToBottom) {
//     this.content.scrollToBottom(100);
//   }
// }
// sendMessage(){
//   // this.chatService.getLength().subscribe(
//   //   (commentCode)=>{
//   //     let comment:Comments=new Comments(commentCode,this.thisUser.UserId,this.travelCode,this.newMsg,new Date()
//   //      ,this.thisUser.UserFirstName);
//   //     this.commantsService.AddComments(comment); 
//        this.newMsg='';
//   setTimeout(()=>{
//     this.updateScroll();
//   }, 500);
//     }
//  // )
// //}

// }
