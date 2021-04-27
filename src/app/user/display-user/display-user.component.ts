import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/DTO/MODELS/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent implements OnInit {
  currentUser: User
  defultDate: string = '0001-01-01T00:00:00'
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.currentUser = this.userService.currentUser
    this.userService.userUpdatedSubject.subscribe(user=>{
      this.currentUser=user
    }) 
  }
  FirstLetter(userId: string): string {
    var name = userId.toUpperCase()
    return name.substring(0, 2)

  }
  Unsubscribe() {
    Swal.fire({
      html: 'Are you sure that you want to delete?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.userService.Unsubscribe({ UserId: this.userService.currentUser.Id }).subscribe(user => {
          this.userService.setUseLogin(false, null);
          this.router.navigate(['']);
          if (user) {
            Swal.fire('Success', 'the user was deleted sucessfully', 'success')
          }
        }), (err => {
          Swal.fire('Opss...', '):Something went Worng', 'error');
        });

      }
    }
    )}
}
