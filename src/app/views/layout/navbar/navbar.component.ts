import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router
  ) { }


  userName = "Admin"
  ngOnInit(): void {

    //deoce token
    let token = localStorage.getItem('token');
    let payload = token?.split('.')[1];
    if (payload) {
      let payloadDecoded = atob(payload);
      let payloadJson = JSON.parse(payloadDecoded);
      let name = payloadJson.name;
      this.userName = name;
    }

  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    localStorage.removeItem('token');

    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth/login']);
    }
  }

}
