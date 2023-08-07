import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  movies: any[] = []

  isVisible: boolean = false

  movieForm: FormGroup;

  file: File

  constructor(private appService: AppService, private fb: FormBuilder, private adminService: AdminService, private messageService: NzMessageService, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.appService.movies.subscribe({
      next: (res) => {
        this.movies = res !== null ? res : []
      }
    })
    this.movieForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      movieRating: ['', [Validators.required]],
      language: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
      viewType: ['', [Validators.required]],
      location: ['', [Validators.required]],
      theatres: ['', [Validators.required]]
    });
  }


  showModal(): void {
    this.isVisible = true;
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.file = fileInput.files[0];
  }

  onSubmit() {
    const formData = new FormData()
    const movieData = this.movieForm.value
    const theatreDetails = movieData.theatres.replace(", ", ",").split(",")
    const constructedTheatreDetails = []
    for (let theatre of theatreDetails) {
      const theatreData = theatre.split(":")
      constructedTheatreDetails.push([theatreData[0], theatreData[1]])
    }
    movieData.theatres = constructedTheatreDetails
    formData.append('data', JSON.stringify(movieData))
    formData.append('photo', this.file)
    this.adminService.addMovie(formData).subscribe({
      next: (res) => {
        this.messageService.success(res.message, { nzDuration: 3000 })
        this.appService.getMovies("0").subscribe({
          next: (response) => {
            this.appService.movies.next(response)
          },
          error: (err) => {
            console.log(err)
          }
        })
      },
      error: (err) => {
        this.messageService.error("Something went wrong, Try again!", { nzDuration: 3000 })
        console.log(err)
      }
    })
    this.isVisible = false
    this.movieForm.reset()
  }

  deleteMovie(id: string) {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this movie?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.adminService.deleteMovie(id).subscribe({
        next: (res) => {
          this.messageService.success(res.message, { nzDuration: 3000 })
          this.appService.getMovies("0").subscribe({
            next: (response) => {
              this.appService.movies.next(response)
            },
            error: (err) => {
              console.log(err);
            }
          })
        },
        error: (err) => {
          this.messageService.error("Something went wrong, Try again!", { nzDuration: 3000 })
        }
      }),
      nzCancelText: 'No',
    });
  }

}
