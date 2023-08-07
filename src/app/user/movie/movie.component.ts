import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: any ;

  validateForm!: UntypedFormGroup;

  showModal: boolean = false;

  constructor(private appService: AppService, private userService: UserService, private fb: UntypedFormBuilder, private router: Router, private messageService: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      theatreName: [null, [Validators.required]],
      numberOfTickets: [null, [Validators.required]]
    })
    this.userService.movie.subscribe({
      next: (movie) => {
        this.movie = movie
        this.movie.theatres = movie.theatres.filter((movie: any) => movie[1] !== '0')
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  handleOk() {
    this.router.navigateByUrl('app/user/movies')
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      if(!this.appService.loginStatus) {
        this.router.navigateByUrl('app/auth/login')
      } else {
        let ticket = this.validateForm.value
        const ticketData = ticket.theatreName.split("-")
        const availableTickets = ticketData[1]
        ticket.theatreName = ticketData[0]
        ticket.movieId = this.movie.id
        ticket.username = this.appService.username
        if(availableTickets - ticket.numberOfTickets >= 0) {
          this.userService.bookTicket(ticket).subscribe({
            next: (response) => {
              if(response.message === "Tickets booked successfully!") {
                this.showModal = true
              }
            },
            error: (err) => {
              console.log(err);
            }
          })
        } else {
          this.messageService.error(`${ticket.numberOfTickets} tickets not available to book!`)
        }
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
