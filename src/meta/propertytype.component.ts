import { FormControl } from '@angular/forms';

import { PropertyType } from '../entitytype';

export abstract class PropertyTypeComponent {

    public propertyType: PropertyType;
    public mgFormControl: FormControl;

};
