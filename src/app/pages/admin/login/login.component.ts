import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { LoginForm } from './login.model';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();

  previousUrl = "";
  error = '';
  loginForm :LoginForm = {
    username: '',
    password: ''
  }

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
     this.authenticationService.logout();
     this.router.events
          .pipe(filter((e: any) => e instanceof RoutesRecognized),
            pairwise()
          ).subscribe((e: any) => {
        this.previousUrl = e[0].urlAfterRedirects;
      });
  }

  onSubmit(){
    this.authenticationService.login(this.loginForm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response === true) {
            this.router.navigate([this.previousUrl]);
        } else {
            this.error = 'Username or password is incorrect';
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
