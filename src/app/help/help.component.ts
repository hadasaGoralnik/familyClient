import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  form: FormGroup;
  
    public loginInvalid: boolean;
  
    private formSubmitAttempt: boolean;
  
    private returnUrl: string;
    constructor(
  
      // private fb: FormBuilder,
  
      // private route: ActivatedRoute,
  
      // private router: Router,

   
    ) {

    }
    ngOnInit() {
       
      // this.form = this.fb.group({
        
      //         username: ['', Validators.email],
        
      //         password: ['', Validators.required]
      //   });
    }
      }





