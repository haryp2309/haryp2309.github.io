import Image from "./Image/Image";
import { darkTheme } from "./colorPalette";
import { IconButton, Typography } from "@material-ui/core";

function ProfilePicture(props) {
  console.log(props);
  return (
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      color="inherit"
      onClick={() => window.open("https://github.com/haryp2309")}
    >
      {window.screen.availWidth > 500 ? (
        <Typography variant="h6">haryp2309</Typography>
      ) : (
        void 0
      )}
      <Image
        style={{
          borderRadius: "100%",
          width: "50px",
          height: "50px",
          paddingTop: 0,
          backgroundColor: darkTheme.palette.secondary.main,
          marginLeft: "10px",
        }}
        imageStyle={{
          borderRadius: "100%",
          width: "50px",
          height: "50px",
          border: "solid 3px" + darkTheme.palette.secondary.main,
        }}
        src={props.pburl}
        aspectRatio={1 / 1}
        disableSpinner
      />
    </IconButton>
  );
}

export default ProfilePicture;
