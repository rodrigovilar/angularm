import { Component } from '@angular/core';

import { FlashMessageService } from './flash.message.service';

@Component({
    selector: 'mg-flash-message',
    template: '<div *ngIf="message"><p>{{message}}</p></div>',
})
export class FlashMessageComponent {

    message: string;

    constructor(service: FlashMessageService) {
        service.messageChanged$.subscribe( message => {
            this.message = message;
        });
    }
}
