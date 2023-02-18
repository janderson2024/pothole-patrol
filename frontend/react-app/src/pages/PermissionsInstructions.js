import React from "react";

export default function Instructions(props) {
  return (
    <main>
      <div className="instructions-container">
        <div className="instructions-greeting-container">
          <h1 className="instructions-greeting">
            Welcome to{" "}
            <strong className="instructions-prettify-title">
              <strong className="instructions-prettify-first-letter">P</strong>
              OTHOLE{" "}
              <strong className="instructions-prettify-first-letter">P</strong>
              ATROL!
            </strong>{" "}
            <hr className="instructions-divider"></hr>
          </h1>
          {/* <h2 className="browsers-list-title">
            You're seeing this page because you haven't enabled location
            permissions for this site.
          </h2>
          <hr className="instructions-divider"></hr> */}
          <div className="instructions-section-container">
            <h2 className="instructions-subheading">
              Before you can use our app to report potholes near you, you'll
              need to:
            </h2>
            <ol className="browsers-ordered-list">
              <li className="browsers-list-item">
                <strong className="accept-permissions-emphasis">
                  Allow location permissions for this site in your browser.
                </strong>{" "}
                You can find instructions specific to your browser through the
                following links:
                <ul className="browsers-unordered-list">
                  <br></br>
                  <li className="browsers-list-item">
                    <a
                      className="browser-link"
                      href="https://support.google.com/chrome/answer/142065?hl=en&co=GENIE.Platform%3DAndroid"
                    >
                      Chrome
                    </a>
                  </li>
                  <li className="browsers-list-item">
                    <a
                      className="browser-link"
                      href="https://support.apple.com/guide/safari/customize-settings-per-website-ibrw7f78f7fe/16.1/mac/13.0"
                    >
                      Safari
                    </a>
                  </li>
                  <li className="browsers-list-item">
                    <a
                      className="browser-link"
                      href="https://support.microsoft.com/en-us/microsoft-edge/location-and-privacy-in-microsoft-edge-31b5d154-0b1b-90ef-e389-7c7d4ffe7b04"
                    >
                      Edge
                    </a>
                  </li>
                  <li className="browsers-list-item">
                    <a
                      className="browser-link"
                      href="https://support.mozilla.org/en-US/kb/does-firefox-share-my-location-websites?redirectslug=does-firefox-share-my-location-web-sites&redirectlocale=en-US#w_how-does-it-work"
                    >
                      Firefox
                    </a>
                  </li>
                  <li className="browsers-list-item">
                    <a
                      className="browser-link"
                      href="https://help.opera.com/en/geolocation/learn-more/"
                    >
                      Opera
                    </a>
                  </li>
                  <li className="browsers-list-item">
                    <a
                      className="browser-link"
                      href="https://support.google.com/accounts/answer/3467281?hl=en#zippy="
                    >
                      Android
                    </a>
                  </li>
                  <li className="browsers-list-item">
                    <a
                      className="browser-link"
                      href="https://support.apple.com/en-us/HT203033"
                    >
                      iOS/iPadOS
                    </a>
                  </li>
                </ul>
              </li>
              <br></br>
              <li className="browsers-list-item">
                Refresh the page. Once you do that, you'll have access to the
                app which looks like this image:
                <br></br>
                <br></br>
                <img
                  className="home-page-screenshot"
                  src="./pothole-patrol-mobile.png"
                  alt=""
                ></img>
              </li>
              <br></br>
              <li className="browsers-list-item">
                If refreshing the page doesn't work, close and reopen the
                browser. Then go come back to this site.
              </li>
            </ol>
          </div>
        </div>
      </div>
      <footer>
        <div className="gitlab-container">
          <a href="https://gitlab.com/janderson2024/pothole-patrol">
            <img className="gitlab-icon" src="./gitlab_icon.png" alt="Logo" />
          </a>
          <span>
            <a
              className="gitlab-pitch"
              href="https://gitlab.com/janderson2024/pothole-patrol"
            >
              Code on GitLab
            </a>
          </span>
        </div>{" "}
        &copy; 2023 Joshua Anderson, Dennis Bowen, Monica Tuttle{" "}
      </footer>
    </main>
  );
}
