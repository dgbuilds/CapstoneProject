import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarker } from '@fortawesome/free-solid-svg-icons';

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
  teamMembers = [
    {
      name: 'Manikanta',
      role: 'Developer',
      image: 'assets/team/manikanta.jpg',
      linkedin: 'https://linkedin.com/in/manikanta',
      github: 'https://github.com/manikanta'
    },
    {
      name: 'Dhruv',
      role: 'Developer',
      image: 'assets/team/dhruv.jpg',
      linkedin: 'https://linkedin.com/in/dhruv',
      github: 'https://github.com/dhruv'
    },
    {
      name: 'Chrisdha',
      role: 'Developer',
      image: 'assets/team/chrisdha.jpg',
      linkedin: 'https://linkedin.com/in/chrisdha',
      github: 'https://github.com/chrisdha'
    },
    {
      name: 'Harsh',
      role: 'Developer',
      image: 'assets/team/harsh.jpg',
      linkedin: 'https://linkedin.com/in/harsh',
      github: 'https://github.com/harsh'
    },
    {
      name: 'Varsith',
      role: 'Developer',
      image: 'assets/team/harsh.jpg',
      linkedin: 'https://linkedin.com/in/harsh',
      github: 'https://github.com/harsh'
    },
    {
      name: 'Deepika',
      role: 'Developer',
      image: 'assets/team/deepika.jpg',
      linkedin: 'https://linkedin.com/in/deepika',
      github: 'https://github.com/deepika'
    }
  ];

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
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMapMarker = faMapMarker;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }


  onContactSubmit() {
    console.log('Contact form submitted');
  }


}
