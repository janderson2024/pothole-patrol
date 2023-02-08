export default function About() {
  return (
    <main>
      <div className="about-container">
        <h2 classname="h2">ABOUT</h2>
        <h3 className="h3">OVERVIEW</h3>
        <p className="p">
          Potholes are a potentially dangerous road hazard and a common
          complaint of residents across municipalities in the United States and
          globally. Not every municipality has a robust 311 call center
          ticketing system set up. Pothole Patrol crowdsources pothole reports
          so we all can better track these road hazards on our daily routes.
        </p>
        <h3 className="h3">PRIVACY</h3>
        <p className="p">
          While allowing location permissions in your browser is required for
          the app to work, we take every possible precaution to protect personally
          identifiable data. We only gather information strictly necessary for running the app, namely the user's IP address, 
          the user's 'user agent', which is simply information the browser sends about the type of a device, and the user's city based off
          a geolocation check. We don't store current user positions or track user movements.
          All information shown on the public map is anonymous. The app does not gather personal contact information. Our
          backend database only contains anonymous User ID's.
        </p>
        <div className="indent-container">
          <h3 className="h3">ATTRIBUTIONS</h3>
          <p className="p">
            For the Google fonts and the logo featured on our app, we wish to
            acknowledge the following artists:
            <ul>
              <li>
                <a 
                  className="attributions"
                  href="https://www.flaticon.com/authors/chattapat"
                >
                  Chattapat
                </a>
              </li>
              <li>
                <a
                  className="attributions"
                  href="https://christianrobertson.com/"
                >
                  Christian Robertson
                </a>
              </li>
              <li>
                <a className="attributions" href="https://www.emreparlak.com/">
                  Emre Parlak
                </a>
              </li>
              <li>
                <a
                  className="attributions"
                  href="https://www.behance.net/erreefe?locale=en_US"
                >
                  Rodrigo Fuenzalida
                </a>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </main>
  );
}
