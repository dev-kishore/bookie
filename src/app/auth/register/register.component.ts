import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    validateForm!: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder, private authService: AuthService, private message: NzMessageService, private router: Router, private appService: AppService) { }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            username: [null, [Validators.required]],
            email: [null, [Validators.email, Validators.required]],
            contactNumber: [null, [Validators.required]],
            role: [null, [Validators.required]],
            password: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required, this.confirmationValidator]],
        });
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            let formValues = this.validateForm.value
            delete formValues.confirmPassword
            this.authService.register(formValues).subscribe({
                next: (response) => {
                    if(response.hasOwnProperty('message')) {
                        this.message.error(response.message, {
                            nzDuration: 4000
                        })
                    } else {
                        localStorage.setItem('bookie-token', response.token)
                        this.appService.loginStatus = true
                        this.appService.username = response.username
                        this.message.success("Welcome!", {
                            nzDuration: 3000
                        })
                        this.router.navigateByUrl("app/user/movies")
                    }
                },
                error: (error) => {
                    console.log(error)
                }
            })
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    updateConfirmValidator(): void {
        Promise.resolve().then(() => this.validateForm.controls["confirmPassword"].updateValueAndValidity());
    }

    confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls["password"].value) {
            return { confirm: true, error: true };
        }
        return {};
    };

}
