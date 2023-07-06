"use client"
import { SvgIcon } from "@mui/material";

const UserProfile = (props) => {
  return (
    <SvgIcon
      viewBox="0 0 16 17"
      sx={{
        "& .secondary": {
          opacity: 0.4,
        },
      }}
      {...props}
    >
      <path d="M8 7.49999C10.0619 7.49999 11.7333 5.82852 11.7333 3.76666C11.7333 1.7048 10.0619 0.0333252 8 0.0333252C5.93813 0.0333252 4.26666 1.7048 4.26666 3.76666C4.26666 5.82852 5.93813 7.49999 8 7.49999Z" />
      <path
        d="M0.533325 12.7266V13.4733C0.533325 14.2981 1.2762 14.9666 2.19258 14.9666H13.8074C14.7238 14.9666 15.4667 14.2981 15.4667 13.4733V12.7266C15.4667 10.6648 13.6094 8.99329 11.3185 8.99329H4.68147C2.39052 8.99329 0.533325 10.6648 0.533325 12.7266Z"
        className="secondary"
      />
    </svg>
</SvgIcon>
  );
};

export default UserProfile;
