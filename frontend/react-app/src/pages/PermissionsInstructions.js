import React from "react";

export default function Instructions(props) {
  return (
    <main>
      <div className="instructions-container">
        <h1 className="instructions-greeting">
          WELCOME TO THE POTHOLE PATROL APP!
        </h1>
        <h2 className="browsers-list-title">
          Location Permissions for Chrome, Safari, Edge, Firefox,
          Opera, and Android/iOS Devices
        </h2>
        <h4>Before you can use this app to report potholes, you'll need to:</h4>

        <ol className="browsers-ordered-list">
          <li className="browsers-list-item">
            Accept location permissions in your browser. You can find
            instructions for allowing location permissions in your browser
            through the following links:
            <ul className="browsers-unordered-list">
              <li className="browsers-list-item">
                <a href="https://support.google.com/chrome/answer/142065?hl=en&co=GENIE.Platform%3DAndroid">
                  Chrome
                </a>
              </li>
              <li className="browsers-list-item">
                <a href="https://support.apple.com/guide/safari/customize-settings-per-website-ibrw7f78f7fe/16.1/mac/13.0">
                  Safari
                </a>
              </li>
              <li className="browsers-list-item">
                <a href="https://support.microsoft.com/en-us/microsoft-edge/location-and-privacy-in-microsoft-edge-31b5d154-0b1b-90ef-e389-7c7d4ffe7b04">
                  Edge
                </a>
              </li>
              <li className="browsers-list-item">
                <a href="https://support.mozilla.org/en-US/kb/does-firefox-share-my-location-websites?redirectslug=does-firefox-share-my-location-web-sites&redirectlocale=en-US#w_how-does-it-work">
                  Firefox
                </a>
              </li>
              <li className="browsers-list-item">
                <a href="https://help.opera.com/en/geolocation/learn-more/">
                  Opera
                </a>
              </li>
              <li className="browsers-list-item">
                <a href="https://support.google.com/accounts/answer/3467281?hl=en#zippy=">
                  Android
                </a>
              </li>
              <li className="browsers-list-item">
                <a href="https://support.apple.com/en-us/HT203033">
                  iOS/iPadOS
                </a>
              </li>
            </ul>
          </li>
          <li className="browsers-list-item">
            Refresh the page. Once you do that, this page should change and look
            like this:
            <img className="home-page-screenshot" src="./pothole-patrol-mobile.png" alt=""></img>
          </li>
          <li className="browsers-list-item">
            If refreshing the page doesn't allow the app to work even after you have enabled
            location permissions in the browser, close and reopen your browser. Then
            navigate back to the app.
          </li>
        </ol>
      </div>
    </main>
  );
}
