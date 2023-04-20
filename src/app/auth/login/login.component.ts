import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: UntypedFormGroup;

  resetPassword: boolean = false;

  constructor(private fb: UntypedFormBuilder, private router: Router, private authService: AuthService, private message: NzMessageService, private appService: AppService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  navigateToRegister() {
    this.router.navigateByUrl("app/auth/register")
  }

  toggleResetPassword() {
    this.resetPassword = !this.resetPassword
    this.validateForm.reset()
  }
  
  resetUserPassword() {

  }

  submitForm(): void {
    if (this.validateForm.valid) {
      if(this.resetPassword && this.validateForm.value.username !== "admin") {
        const password = {
          password: this.validateForm.value.password
        }
        this.authService.resetPassword(this.validateForm.value.username, password).subscribe({
          next: (response) => {
            if(response.message === "Password reset successfull!") {
              this.message.success(response.message, {
                nzDuration: 3000
              })
              this.resetPassword = !this.resetPassword
            } else {
              this.message.error("Try again!", {
                nzDuration: 3000
              })
            }
          },
          error: (error) => {

          }
        })
        this.validateForm.reset()
      } else {
        this.authService.login(this.validateForm.value).subscribe({
          next: (response) => {
            if(response.hasOwnProperty('token')) {
              this.message.success("Login successfull!", {
                nzDuration: 3000
              })
              localStorage.setItem('bookie-token', response.token)
              this.appService.loginStatus = true
              this.appService.username = response.username
              this.router.navigateByUrl('app/user/movies')
            } else {
              this.message.error(response.message, {
                nzDuration: 3000
              })
            }
          },
          error: (error) => {
            this.message.error("Check username and password!", {
              nzDuration: 3000
            })
          }
        })
        this.validateForm.reset()
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
