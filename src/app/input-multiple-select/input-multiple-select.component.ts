import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

declare const $: any;

export interface Option {
    label: string;
    value: string;
}

@Component({
    selector: 'app-input-multiple-select',
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputMultipleSelectComponent), multi: true},
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => InputMultipleSelectComponent), multi: true}
    ],
    template: `
        <div class="form-group">
            <label class="form-control-label" *ngIf="label">{{label}}:</label>
            <select multiple title="{{title}}" class="form-control" data-style="btn-block" data-size="7"
                    (change)="onChange($event)">
                <option *ngFor="let option of options" [value]="option.value">{{option.label}}</option>
            </select>
            <small class="help-block" *ngIf="help">{{help}}</small>
        </div>`,
    styles: [`.form-control {
        background-color: transparent !important;
    }`]
})
export class InputMultipleSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit {

    @Input() label: string;
    @Input() help: string;
    @Input() options: Option[];
    @Input() title: string;
    @Input() formControlName: any;
    private readonly errorMessages = {
        'required': () => 'Este campo é requerido.'
    };
    protected innerValue: any;
    private control: FormControl;

    private propagateChange = (_: any) => {
    };

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        $('select', this.el.nativeElement).selectpicker({
            iconBase: 'ti',
            tickIcon: 'ti-check'
        });
    }

    onChange(event) {
        this.propagateChange($('select', this.el.nativeElement).val());
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
