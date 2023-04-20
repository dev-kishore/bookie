import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: any ;

  validateForm!: UntypedFormGroup;

  showModal: boolean = false;

  constructor(private appService: AppService, private userService: UserService, private fb: UntypedFormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      theatreName: [null, [Validators.required]],
      numberOfTickets: [null, [Validators.required]]
    })
    this.userService.movie.subscribe({
      next: (movie) => {
        this.movie = movie
      },
      error: (error) => {

      }
    })
  }

  handleOk() {
    this.router.navigateByUrl('app/user/movies')
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      let ticket = this.validateForm.value
      ticket.movieId = this.movie.id
      ticket.username = this.appService.username
      this.userService.bookTicket(ticket).subscribe({
        next: (response) => {
          if(response.message === "Tickets booked successfully!") {
            this.showModal = true
          }
        },
        error: (error) => {

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

}
