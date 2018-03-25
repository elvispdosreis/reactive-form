import {Component, Input} from '@angular/core';
import {AbstractControl, AbstractControlDirective} from '@angular/forms';

@Component({
    selector: 'app-show-errors',
    template: `
        <small *ngIf="shouldShowErrors()" class="text-danger">
            <span *ngFor="let error of listOfErrors() | slice:0:1">{{error}}</span>
        </small>
    `
})
export class ShowErrorsComponent {

    private static readonly errorMessages = {
        'required': () => 'Este campo é requerido.',
        'email': () => 'Por favor, forneça um endereço de email válido.',
        'min': (params) => 'Por favor, forneça um valor maior ou igual a ' + params.requiredMin + '.',
        'minlength': (params) => 'Por favor, forneça ao menos ' + params.requiredLength + ' caracteres. ',
        'max': (params) => 'Por favor, forneça um valor menor ou igual a ' + params.requiredMax + '.',
        'maxlength': (params) => 'Por favor, forneça não mais que ' + params.requiredLength + ' caracteres.',
        'pattern': (params) => 'O formato fornecido é inválido. ' + params.requiredPattern
    };

    @Input() private control: AbstractControlDirective | AbstractControl;

    shouldShowErrors(): boolean {
        return this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field]));
    }

    private getMessage(type: string, params: any) {
        return ShowErrorsComponent.errorMessages[type](params);
    }

}
