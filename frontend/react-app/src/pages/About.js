export default function About() {
  return (
    <main>
      <div className="about-container">
        <h2 classname="h2">ABOUT</h2>
        <h3 className="h3">OVERVIEW</h3>
        <p className="p">
          Potholes are potentially dangerous road hazards and a common complaint
          of residents across municipalities in the United States and globally.
        </p>
        <p className="p">
          Not every municipality has a robust 311 call center ticketing system
          set up. Pothole Patrol crowdsources pothole reports so we all can
          better track these road hazards on our daily routes.
        </p>
        <h3 className="h3">PRIVACY</h3>
        <p className="p">
          While allowing location permissions in your browser is required for
          the app to work, we take every possible precaution to protect
          personally identifiable data.
          <p className="p">
            We only gather information strictly necessary for running the app:
            <ul>
              <li className="privacy-list-item">user's IP address</li>
              <li className="privacy-list-item">
                <em>the user agent</em>, which is simply information the browser
                sends about the type of a device being used
              </li>
              <li className="privacy-list-item">
                user's city based off a geolocation check
              </li>
            </ul>
          </p>
          We do <em>not</em>:
          <ul>
            <li className="privacy-list-item">
              track current user positions or user movements
            </li>
            <li className="privacy-list-item">
              gather personal contact information
            </li>
          </ul>
          <br></br>
          Our database only contains auto-generated and anonymous User IDs, and all
          information shown on the map is anonymous.
        </p>
        <h3 className="h3">THE TEAM</h3>
        <p className="p">
          Pothole Patrol was developed by Joshua Anderson, Dennis Bowen, and
          Monica Tuttle, with support from TechWise by TalentSprint, an 18-month
          software engineering upskilling program sponsored by Google.
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
      <footer>&copy; 2023 Joshua Anderson, Dennis Bowen, Monica Tuttle </footer>
    </main>
  );
}
