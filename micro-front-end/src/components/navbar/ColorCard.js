import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./store/choose_theme/ChooseThemeActions";

const ColorCard = ({ colors, theme }) => {
  const state = useSelector((state) => ({
    theme: state.changeTheme.theme,
  }));
  const dispatch = useDispatch();

  const selectTheme = (event) => {
    event.preventDefault();
    dispatch(setTheme(event.currentTarget.id));
  };
  const shadow =
    colors.type === "dark"
      ? "0px 0px 10px 0.2px rgba(255,255,255,1)"
      : "0px 0px 10px 0.2px rgba(0,0,0,1)";
  const textColor = colors.type === "dark" ? "#ffffff" : "#000000";
  return (
    <>
      <div
        style={{
          background: colors.background.default,
          boxShadow: state.theme === theme ? shadow : "none",
          minWidth: "160px",
          maxWidth: "160px",
          minHeight: "160px",
          maxHeight: "160px",
          borderRadius: "10%",
          borderTop: `40px solid ${colors.primary.main}`,
        }}
        id={theme}
        onClick={(event) => selectTheme(event)}
      >
        <div style={{ margin: "-30px 0 10px 10px", color: textColor }}>
          {" "}
          Header{" "}
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              background: colors.background.paper,
              minWidth: "100px",
              maxWidth: "100px",
              minHeight: "100px",
              maxHeight: "100px",
              margin: "-10px 10px 0 10px",
              borderRadius: "10%",
            }}
          >
            <div style={{ margin: "10px 0 10px 10px", color: textColor }}>
              {" "}
              Paper{" "}
            </div>
          </div>
          <div
            style={{
              background: colors.secondary.main,
              minWidth: "40px",
              maxWidth: "40px",
              minHeight: "40px",
              maxHeight: "40px",
              borderRadius: "50%",
              textAlign: "center",
              margin: "-10px 0 0 -5px",
            }}
          >
            <div style={{ margin: "10px 0", color: textColor }}> B </div>
          </div>
        </div>
        <div style={{ margin: "0 0 10px 10px", color: textColor }}>
          {" "}
          Background{" "}
        </div>
      </div>
    </>
  );
};

export default ColorCard;
