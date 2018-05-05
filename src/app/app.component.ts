import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'app';

    public opcoes: {}[] = [
        {value: 'waiting_payment', label: 'Aguardando Pagamento'},
        {value: 'approved', label: 'Pagamento Autorizado'},
        {value: 'handling', label: 'Pedido Separado'},
        {value: 'shipped', label: 'Pedido Enviado'},
        {value: 'delivered', label: 'Pedido Entregue'},
        {value: 'shipped_exception', label: 'Pendência Entrega'},
        {value: 'canceled', label: 'Cancelado'}
    ];

    public cliente: FormGroup;

    pessoa: string[] = [
        'Física',
        'Jurídica'
    ];

    endereco: string[] = [
        'Residencia',
        'Comercial'
    ];

    sexo: string[] = [
        'Masculino',
        'Feminino'
    ];

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {


        this.cliente = this.fb.group({
            email: ['elvisdosreis@gmail.com', [Validators.required, Validators.email, Validators.maxLength(50)]],
            tipo: ['Física', Validators.required],
            fisica: this.fb.group({
                nome: [null, [Validators.required, Validators.maxLength(50)]],
                sobrenome: [null, [Validators.required, Validators.maxLength(50)]],
                cpf: [null, [Validators.required]],
                rg: [null, Validators.required],
                data_nascimento: [null, Validators.required],
                sexo: [null, Validators.required]
            }),
            juridica: this.fb.group({
                razao_social: [null, [Validators.required, Validators.maxLength(100)]],
                contato: [null, [Validators.required, Validators.maxLength(50)]],
                cnpj: [null, [Validators.required]],
                ie: [null, Validators.required, Validators.maxLength(30)]
            }),
            fone: this.fb.group({
                celular: [null, Validators.required],
                fixo: [null, Validators.required]
            }),
            conhecimento: [null, [Validators.required, Validators.maxLength(50)]],
            newsletter: [null, Validators.required],
            endereco: this.fb.group({
                cep: [null, Validators.required],
                tipo: [null, Validators.required],
                logradouro: ['', [Validators.required, Validators.maxLength(100)]],
                numero: [null, [Validators.required, Validators.maxLength(5)]],
                complemento: [null, [Validators.required, Validators.maxLength(50)]],
                bairro: [null, [Validators.required, Validators.maxLength(50)]],
                localidade: [null, [Validators.required, Validators.maxLength(50)]],
                estado: [null, [Validators.required, Validators.maxLength(50)]],
                pais: [null, [Validators.required, Validators.maxLength(50)]],
                referencia: [null, [Validators.required, Validators.maxLength(250)]]
            })
        });


        this.cliente.patchValue({
            endereco: {
                cep: '15025610',
                tipo: 'Comercial',
                logradouro: 'Rua Major João Batista Franca',
                numero: '962',
                complemento: 'Bloco K Apt 11',
                bairro: 'Parque Industrial',
                localidade: 'São José do Rio Preto',
                estado: 'São Paulo',
                pais: 'Brasil',
                referencia: ''
            }
        });

        this.cliente.patchValue({
            fone: {
                fixo: null,
                celular: null
            }
        });

        this.cliente.patchValue({
            fisica: {
                nome: 'Elvis',
                sobrenome: 'Perpetuo dos Reis',
                cpf: '25651783105',
                rg: '8599988-5',
                data_nascimento: '25/03/1984',
                sexo: 'Masculino'
            }
        });

    }


    onSubmit() {

        if (this.cliente.valid) {
            console.log('valid');
        } else {
            console.log('invalid');
            this.formValidate(this.cliente);
        }
    }

    formValidate(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            control.markAsDirty();
            if (control instanceof FormGroup) {
                this.formValidate(control);
            }
        });
    }
}
