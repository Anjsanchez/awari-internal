import "./SideBar.css";
import SubNav from "./SubNav";
import React, { useState } from "react";
import awari from "../../assets/awari.jpg";
import { sideBarData } from "./sideBarData";
import me from "../../assets/tempAvatar.png";
import { makeStyles } from "@material-ui/core/styles";
import { store } from "../../utils/store/configureStore";
import { Avatar, Paper, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
  },
  sidebar_container: {
    overflowY: "auto",
    flex: "1 1",
    [theme.breakpoints.up("lg")]: {
      top: "65px",
    },
  },
}));

const SideBar = React.forwardRef(() => {
  const classes = useStyles();
  const [activeChildMenu, setActiveChildMenu] = useState(0);

  const handleSetActiveChildList = (btn) => setActiveChildMenu(btn);

  const { userRoles, role, firstName, lastName } =
    store.getState().entities.user.user;

  const renderReturn = (m) => {
    return (
      <SubNav
        userRole={userRoles}
        id={m.id}
        key={m.subTitle}
        title={m.subTitle}
        subNav={m.subNav}
        icon={m.icon}
        headerPath={m.path}
        handleSelect={handleSetActiveChildList}
        activeChildMenu={activeChildMenu}
      />
    );
  };

  const checkIfTitleExist = (n) => {
    let isMatchSubNav = false;
    let isMatchNav = false;

    return n.subNav.map((m) => {
      return userRoles.map((ur) => {
        if (m.subNav !== undefined) {
          //..
          return m.subNav.map((s) => {
            if (ur.roleKey !== s.id) return null;
            if (isMatchSubNav) return null;
            isMatchSubNav = true;
            return (
              <span key={s.id} className="sideMenu_container-title">
                {n.title}
              </span>
            );
          });
        } else {
          if (ur.roleKey !== m.id) return null;
        }
        if (isMatchNav) return null;
        isMatchNav = true;
        return (
          <span key={1 + m.id} className="sideMenu_container-title">
            {n.title}
          </span>
        );
      });
    });
  };

  const renderSideBarWithUserRoles = (n) => {
    let isMatchSubNav = false;
    let lastItem = "";
    return (
      <>
        {checkIfTitleExist(n)}

        <ul className="sideMenu_ul">
          <li className="sideMenu_li">
            {n.subNav.map((m) => {
              return userRoles.map((ur) => {
                if (m.subNav !== undefined) {
                  //..

                  return m.subNav.map((s) => {
                    if (ur.roleKey !== s.id) return null;

                    if (lastItem !== m.subTitle) isMatchSubNav = false;
                    if (isMatchSubNav) return null;
                    isMatchSubNav = true;
                    lastItem = m.subTitle;
                    return renderReturn(m);
                  });
                } else {
                  if (ur.roleKey !== m.id) return null;
                }
                return renderReturn(m);
              });
            })}
          </li>
        </ul>
      </>
    );
  };

  return (
    <>
      <Paper
        square
        elevation={3}
        className={`sidebar_container on-scrollbar ${classes.sidebar_container}`}
      >
        <div className="sideBar_logo">
          <Avatar alt="Cindy Baker" src={awari} className={classes.large} />
        </div>
        <div className="userInfo_mainContainer">
          <div className="userInfo_container">
            <div className="userInfo_image">
              <Avatar alt="Cindy Baker" src={me} />
            </div>
            <div className="userInfo_nameContainer">
              <span className="userInfo_name">
                {firstName} {lastName}
              </span>
              <span className="userInfo_role">{role.rolename}</span>
            </div>
          </div>
        </div>
        <Divider />

        <div className="sideMenuBar_mainContainer">
          {sideBarData.map((n) => (
            <div key={n.title} className="sideMenubar_container">
              {renderSideBarWithUserRoles(n)}
            </div>
          ))}
        </div>
      </Paper>
    </>
  );
});

export default SideBar;
