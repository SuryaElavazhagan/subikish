import firebase from 'firebase';

export class Firebase {
  private static INSTANCE: Firebase;

  public static getInstance() {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new Firebase();
    }
    return this.INSTANCE;
  }

  private firebaseConfig = {
    apiKey: "AIzaSyDbYYH0wdWmPFwxjp3KC9xR4xojyhX0m2s",
    authDomain: "subikish-678bf.firebaseapp.com",
    databaseURL: "https://subikish-678bf.firebaseio.com",
    projectId: "subikish-678bf",
    storageBucket: "subikish-678bf.appspot.com",
    messagingSenderId: "129719416859",
    appId: "1:129719416859:web:86f3c5f32a66e3c131e0be",
    measurementId: "G-63ZZY8PG3S"
  };
  private db: firebase.database.Database;
  private messaging: firebase.messaging.Messaging;

  private constructor() {
    firebase.initializeApp(this.firebaseConfig);
    this.db = firebase.database();
    this.messaging = firebase.messaging();
    
  }

  public async setRSVP(rsvp: 'yes' | 'no') {
    const auth = firebase.auth().currentUser;
    if (auth) {
      await this.db.ref(`users/${auth.displayName}`).set({ rsvp });
    }
  }

  public async initializeNotifications() {
    const permission = await Notification.requestPermission();

    function isTokenSentToServer() {
      return window.localStorage.getItem('sentToServer') === '1';
    }

    function setTokenSentToServer(sent: boolean) {
      window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    }

    if (permission === 'granted') {
      firebase.auth().onAuthStateChanged(async (user) => {
        const token = await this.messaging.getToken({ vapidKey: 'BDd02rR0NsDfmSfnjVSxDwPBPLCQDQF8Ebnx84phT61ypTQdFoexULMBqfzhkvxJAHRXk31XZq20fqKmFnmPQe4' });
        if (!isTokenSentToServer()) {
          setTokenSentToServer(true);
          this.db.ref(`users/${user?.displayName}`).update({ token });
        }
        this.messaging.onMessage(function (payload) {
          if (typeof payload === 'string') {
            payload = JSON.parse(payload);
          }
          window.open(payload.url);
        });
      });
    }
  }
}