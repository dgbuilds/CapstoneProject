import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  featuredEvents = [
    {
      title: 'Tech Conference 2024',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
      date: '2024-03-15',
      description: 'Join the biggest tech conference of the year'
    },
    {
      title: 'Music Festival',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
      date: '2024-04-20',
      description: 'Experience amazing live performances'
    },
    {
      title: 'Food & Wine Expo',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
      date: '2024-05-10',
      description: 'Taste extraordinary cuisines and wines'
    }
  ];

  constructor(private router : Router) {

  }

  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }

  faCalendar = faCalendarAlt;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }
}
