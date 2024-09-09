import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.page.html',
  styleUrls: ['./portal.page.scss'],
})
export class PortalPage implements OnInit {
  
  username: string = 'guest';

  constructor(
    private router: Router
  ) { 
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state){
      this.username = state['user']
    }
  }

  ngOnInit() {
  }

}
