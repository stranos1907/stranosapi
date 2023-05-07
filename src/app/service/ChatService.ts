import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
    constructor(private socket: Socket) {
        this.socket.on('connect', () => {
          this.emitToken();
        });
      }

  // Subscribe to the 'new-message' event
  subscribeToNewMessage(callback) {
    this.socket.on('dialog/new-message', (message) => {
        debugger
      callback(message)
    });
  }

  // Emit the 'on-message' event with a message
  sendMessage(message: any) {
    
  }

  emitToken() {
        let token = localStorage.getItem("token")
        if (token) {
            const user = new JwtHelperService().decodeToken(token);
            this.socket.emit("subscribe/admin", { _id: user._id })
        }
  }


}
