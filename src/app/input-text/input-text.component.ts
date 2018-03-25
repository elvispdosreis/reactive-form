import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormControlName, FormGroup, FormGroupDirective} from '@angular/forms';

@Component({
    selector: 'app-input-text',
    template: `
        <div class="form-group" [formGroup]="group">
            <label class="form-control-label"> {{label}}: <span
                    class="star">*</span></label>
            <input type="text" class="form-control" [formControlName]="id" [id]="id"/>
            <app-show-errors [control]="control"></app-show-errors>
        </div>
    `,
    styles: [`.form-control-label.required:after {
        color: #d00;
        content: "*";
        position: absolute;
        margin-left: 5px;
        top: 7px;
    }`]
})
export class InputTextComponent implements OnInit {

    control: FormControl;

    @Input() id: string;
    @Input() label: string;
    @Input() group: FormGroup;

    constructor(private formGroupDirective: FormGroupDirective) {
    }

    ngOnInit() {
        this.control = this.formGroupDirective.control.get(this.id) as FormControl;
        console.log(this.group);
    }
}
