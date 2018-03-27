import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-input-text',
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputTextComponent), multi: true},
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => InputTextComponent), multi: true}
    ],
    template: `
        <div class="form-group">
            <label class="form-control-label required">{{label}}:</label>
            <input type="text" [value]="innerValue" class="form-control" (input)="onChange($event)"/>
            <small *ngIf="shouldShowErrors()" class="text-danger">
                <span *ngFor="let error of listOfErrors() | slice:0:1">{{error}}</span>
            </small>
        </div>
    `,
    styles: [`.form-control-label.required:after {
        color: red;
        content: "*";
        position: absolute;
        margin-left: 7px;
    }`]
})
export class InputTextComponent implements ControlValueAccessor {

    @Input() label: string;
    @Input() formControlName: any;
    private readonly errorMessages = {
        'required': () => 'Este campo é requerido.',
        'email': () => 'Por favor, forneça um endereço de email válido.',
        'min': (params) => 'Por favor, forneça um valor maior ou igual a ' + params.requiredMin + '.',
        'minlength': (params) => 'Por favor, forneça ao menos ' + params.requiredLength + ' caracteres. ',
        'max': (params) => 'Por favor, forneça um valor menor ou igual a ' + params.requiredMax + '.',
        'maxlength': (params) => 'Por favor, forneça não mais que ' + params.requiredLength + ' caracteres.',
        'pattern': (params) => 'O formato fornecido é inválido. ' + params.requiredPattern + '.'
    };
    private innerValue: string;
    private control: FormControl;
    private propagateChange = (_: any) => {
    };

    onChange(event) {
        this.propagateChange(event.target.value);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    get value(): any {
        return this.innerValue;
    }

    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }

    writeValue(v: any): void {
        if (v !== undefined) {
            this.value = v;
        }
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    validate(c: FormControl) {
        this.control = c;
    }

    // Form Validator
    shouldShowErrors(): boolean {
        return this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field]));
    }

    getMessage(type: string, params: any) {
        return this.errorMessages[type](params);
    }
}
