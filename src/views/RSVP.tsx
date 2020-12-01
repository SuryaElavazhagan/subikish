import { MouseEvent } from 'react';
import { Firebase } from '../api/Firebase';
import invitation from '../assets/images/invitation.jpeg';
import '../styles/views/rsvp.scss';

function RSVP() {

  function handleRSVP(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const instance = Firebase.getInstance();
    instance.setRSVP((target.dataset.rsvp as 'yes' | 'no') ?? 'no');
  }

  return (
    <div className="sk-rsvp">
      <h2>RSVP - YOUR PRESENCE</h2>
      <div className="sk-invitation">
        <img
          className="sk-invitation-image"
          src={invitation}
          alt="Saikishore - Subasree Marriage Invitation"
        />
      </div>
      <div className="sk-location">
        <a href="https://www.google.com/maps?q=SRS+Mahal+And+SGS+MINI+Hall+%5B+Marriage+Hall+GST+Road+%5D,+N0:01,+Karanai+Puduchery+Main+Road,+Karanai+Puduchery,+Urapakkam,+Tamil+Nadu+603202&ftid=0x3a52f637c4767f79:0x9a807cead496927&hl=en-IN&gl=in&entry=gps&shorturl=1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1565c0" width="18px" height="18px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          LOCATION
        </a>
      </div>
      <div className="sk-rsvp-acceptance">
        <span>
          <button
            data-rsvp="yes"
            className="sk-button sk-rsvp-accept"
            onClick={handleRSVP}
          >
            YES, I'LL BE ATTENDING
          </button>
        </span>
        <span>
          <button
            data-rsvp="no"
            className="sk-button sk-rsvp-decline"
            onClick={handleRSVP}
          >
            Sorry, I won't be coming
          </button>
        </span>
      </div>
    </div>
  );
}

export default RSVP;