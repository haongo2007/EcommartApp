"use client"
import { SvgIcon } from "@mui/material";

const TodoList = (props) => {
  return (
    <SvgIcon
      viewBox="0 0 20 18"
      sx={{
        "& .secondary": {
          opacity: 0.4,
        },
      }}
      {...props}
    >
      <path d="M2.87719 4.22238C2.72215 4.39113 2.50348 4.49308 2.27215 4.46847C2.04082 4.50714 1.81723 4.41574 1.6534 4.22238L0.247113 2.81613C-0.0823711 2.5173 -0.0823711 1.98293 0.247113 1.65351C0.576563 1.3241 1.11094 1.3241 1.44035 1.65351L2.21766 2.42941L4.15547 0.279257C4.46484 -0.0670321 4.99922 -0.095157 5.34727 0.216679C5.6918 0.528514 5.71992 1.06183 5.40703 1.40847L2.87719 4.22238ZM2.87719 9.84737C2.72215 10.0161 2.50348 10.1181 2.27215 10.0935C2.04082 10.1321 1.81723 10.0407 1.6534 9.84737L0.247113 8.44112C-0.0823711 8.1423 -0.0823711 7.60792 0.247113 7.27745C0.576563 6.9505 1.11094 6.9505 1.44035 7.27745L2.21766 8.05441L4.15547 5.90285C4.46484 5.55831 4.99922 5.53019 5.34727 5.84308C5.6918 6.15245 5.71992 6.68683 5.40703 7.03488L2.87719 9.84737ZM0 13.5001C0 12.5685 0.755508 11.8126 1.6875 11.8126C2.61949 11.8126 3.375 12.5685 3.375 13.5001C3.375 14.4317 2.61949 15.1876 1.6875 15.1876C0.755508 15.1876 0 14.4317 0 13.5001Z" />
      <path
        d="M6.75 12.3751H16.875C17.4973 12.3751 18 12.8778 18 13.5001C18 14.1224 17.4973 14.6251 16.875 14.6251H6.75C6.12773 14.6251 5.625 14.1224 5.625 13.5001C5.625 12.8778 6.12773 12.3751 6.75 12.3751ZM9 6.75011H16.875C17.4973 6.75011 18 7.25284 18 7.87511C18 8.49737 17.4973 9.00011 16.875 9.00011H9C8.37773 9.00011 7.875 8.49737 7.875 7.87511C7.875 7.25284 8.37773 6.75011 9 6.75011ZM9 3.37511C8.37773 3.37511 7.875 2.87237 7.875 2.25011C7.875 1.6289 8.37773 1.12511 9 1.12511H16.875C17.4973 1.12511 18 1.6289 18 2.25011C18 2.87237 17.4973 3.37511 16.875 3.37511H9Z"
        className="secondary"
      />
    </svg>
</SvgIcon>
  );
};

export default TodoList;
