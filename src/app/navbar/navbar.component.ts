import { Component, OnInit } from '@angular/core';
import { User } from '../DTO/MODELS/user.model';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(  private breakpointObserver: BreakpointObserver,
    private router: Router,
    private loginService: LoginService,) { }
    currentPage: any;
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
    // ,
    // {
    //   route: '/documents-list',
    //   title: 'Documents List',
    //   icon:'featured_play_list',
    //   viewMenuTab: true
    // },
   
    // {
    //   route: '/document',
    //   title: ' Edit Document',
    //   icon: 'edit',
    //   viewMenuTab: false
    // },
    // {
    //   route: '/share-document',
    //   title: 'Share Document',
    //   icon: 'share',
    //   viewMenuTab: false
    // },
    // {
    //   route: '/unsubscribe-user',
    //   title: 'Unsubscribe',
    //   icon: 'unsubscribe',
    //   viewMenuTab: true
    // },
    {
      route: '',
      title: 'Logout',
      icon: 'logout',
      isLogout: true,
      unlimitedAccess: true,
    }
 
  ];
  currentUser: User;
  userLoggedIn: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  ngOnInit(): void {
    this.loginService.userSubject
    .subscribe(login=>{
     this.currentUser=login.user
     this.userLoggedIn=login.isLoggedIn
   })
    this.subsribeToUrlNavigation();

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
        isAccessableUrl =true;
      }

      if (isAccessableUrl) {
        this.currentPage = currentPage;
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }
  FirstLetter(userId:string):string{
    var name=userId.toUpperCase()
    return name.substring(0,2)
  }
  logout() {  
    this.loginService.setUseLogin(false,this.currentUser);
}
}
