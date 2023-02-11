import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./styles.css";

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true }); //

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

const MenuPopupState = () => {
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });
  return (
    <div>
      <Button variant="contained" {...bindTrigger(popupState)}>
        Menu
      </Button>
      <Menu {...bindMenu(popupState)}>
        <CustomLink className="link" to="/view_map">
          <MenuItem>VIEW MAP</MenuItem>
        </CustomLink>
        <CustomLink className="link" to="/about">
          <MenuItem>ABOUT</MenuItem>
        </CustomLink>
        <CustomLink className="link" to="/">
          <MenuItem>HOME</MenuItem>
        </CustomLink>
      </Menu>
    </div>
  );
};

export default MenuPopupState;
