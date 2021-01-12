import { Component, OnInit } from '@angular/core';
import { User } from '../DTO/MODELS/user.model';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { Group } from '../DTO/MODELS/group';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private userService: UserService,
    private groupService: GroupService) { }
  currentPage: any;
  display: boolean = false
  pages = [
    {
      route: '/login',
      title: 'Sign In',
      icon: 'login',
      isLogin: true,
      unlimitedAccess: true
    },
    {
      route: '/sign-up',
      title: 'Sign Up',
      icon: 'person_add',
      isLogin: true,
      unlimitedAccess: true
    },

    {
      route: '/group-list',
      title: 'Group List',
      icon: 'groups',
      viewMenuTab: true
    },
    {
      route: '/add-group',
      title: 'Add Group',
      icon: 'groups',
      viewMenuTab: false
    },
    {
      route: '',
      title: 'Logout',
      icon: 'logout',
      isLogout: true,
      unlimitedAccess: true,
    },
    {
      route: '/display-group',
      title: 'Display Group',
      icon: 'group',
      viewMenuTab: false
    },
    {
      route: '/calander',
      title: 'calander',
      icon: 'calendar_today',
      viewMenuTab: false
    },
    {
      route: '/UserListOfGroup',
      title: 'UserListOfGroup',
      icon: 'groups',
      viewMenuTab: false
    },
    {
      route: '/user-group',
      title: 'User In Group',
      icon: 'group',
      viewMenuTab: false
    },
    {
      route: '/chat',
      title: 'Chat',
      icon: 'group',
      viewMenuTab: false
      
    },
  ];
  currentGroup: Group;
  currentUser: User;
  userLoggedIn: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  ngOnInit(): void {
    this.userService.userSubject
      .subscribe(login => {
        this.currentUser = login.user
        this.userLoggedIn = login.isLoggedIn
      })
    this.subsribeToUrlNavigation();

  }
  displayUser() {
    this.display = !this.display
  }
  subsribeToUrlNavigation() {
    this.router.events.subscribe((data: any) => {
   
      if (!data.url || data.url === '' || data.url === '/') return;

      const currentPage = this.pages.find((page) =>
        data.url.includes(page.route)
      );

      let isAccessableUrl = false;

      if (currentPage.unlimitedAccess) {
        isAccessableUrl = true;
      }
      else if (this.userLoggedIn) {
        isAccessableUrl = true;
      }

      if (isAccessableUrl) {
        this.currentPage = currentPage;
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }
  FirstLetter(userId: string): string {
    var name = userId.toUpperCase()
    return name.substring(0, 2)
  }
  logout() {
    this.userService.setUseLogin(false, this.currentUser);
    this.groupService.LogoutGroup();
  }

  g(): boolean{
    this.currentGroup=this.groupService.currentGroup;
    return this.groupService.currentGroup !== undefined;
  }

  displayCalander() {
    this.router.navigate(['/calander/']);
  }
  displaychat(){
    this.router.navigate(['/chat/']);
  }
  displayUserListOfGroup(){
    this.router.navigate(['/UserListOfGroup/']);
  }
  Unsubscribe() {
    console.log("DeleteUserFromGroup")
    this.userService.Unsubscribe({ UserId: this.userService.currentUser.Id }).subscribe(user => {
      this.logout()
      this.router.navigate(['']);
    })
  }
}
