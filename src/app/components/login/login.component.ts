import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    hidePassword = true;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnInit(): void {}

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.loading = true;
            // TODO: Implement authentication logic
            console.log(this.loginForm.value);
        }
    }

    getErrorMessage(field: string): string {
        if (this.loginForm.get(field)?.hasError('required')) {
            return 'This field is required';
        }
        if (field === 'email' && this.loginForm.get('email')?.hasError('email')) {
            return 'Please enter a valid email';
        }
        if (field === 'password' && this.loginForm.get('password')?.hasError('minlength')) {
            return 'Password must be at least 6 characters';
        }
        return '';
    }
}