import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;


@Injectable()
export class AuthService {

  // Configure Auth0
  lock = new Auth0Lock('C83DC9SNZbvj8TGVupO4wx4GmFD7liJT', '8americain.eu.auth0.com', {
    languageDictionary: {
      litle: '8 Américain'
    },
    theme: {
      logo: '../../assets/images/huit.png',
      primaryColor: 'green'
    },
    language: 'fr',
    closable: false
  });

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      this.lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }
        // Save token and profile locally
        localStorage.setItem("profile", JSON.stringify(profile));
        localStorage.setItem("GameName", profile.email);
        window.location.reload()
        // Update DOM
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  }

}
