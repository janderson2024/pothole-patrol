import React, { useState} from 'react';
import './styles.css'

  export default function Actions(props) {
    const [buttons, setButtons] = useState(["Submit My Location", "Locate on Map"]); // need to figure out how to use setButtons
    return (
    <div className = "container">
        <ul className="Actions">
        {buttons.map((item) => (
            <Button href={item}/>
        ))}
        </ul>
    </div>
    );
  }

  function Button({href}) {
    return <button className="button" onclick={`${href}.html`} type="button">{href}</button>
  }


