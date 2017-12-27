import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularmService } from '../../angularm.service';
import { EntityComponent } from '../../meta/entity.component';
import { FlashMessageService } from './flash.message.service';
import { TitleCase } from '../../pipes/titlecase.pipe';


@Component({
    selector: 'tr [mgEntityLine]',
    template:
        `<td *ngFor="let property of entity.mountProperties()">{{property.value}}</td>
         <td> <a href="#" (click)="show()">Show</a></td>
         <td> <a href="#" (click)="edit()">Edit</a></td>
         <td> <a href="#" (click)="destroy()">Destroy</a></td>`,
})
export class EntityLineComponent extends EntityComponent {

    constructor(private router: Router, private flash: FlashMessageService,
            angularm: AngularmService) {
        super(angularm);
    }

    show() {
        this.flash.clearMessage();
        this.router.navigate([this.entity.entityType.plural, this.entity.key]);
        return false;
    }

    edit() {
        this.flash.clearMessage();
        this.router.navigate([this.entity.entityType.plural, this.entity.key, 'edit']);
        return false;
    }

    destroy() {
        if (confirm('Are you sure?')) {
            this.angularm.delete(this.entity.entityType.singular, this.entity.key);
            let entityTypeName = TitleCase.toTitleCase(this.entity.entityType.singular);
            this.flash.changeMessage(`${entityTypeName} was successfully destroyed.`);
        }
        return false;
    }
}
