import React, { useState} from 'react';

  export default function Actions(props) {
    const [buttons, setButtons] = useState(["Submit My Location", "Locate on Map"]); // need to figure out how to use setButtons
    return (
    <div>
        <ul className="Actions">
        {buttons.map((item) => (
            <Button href={item}/>
        ))}
        </ul>
    </div>
    );
  }

  function Button({href}) {
    return <button onclick={`${href}.html`} type="button">{href}</button>
  }


