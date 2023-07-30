import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useRouter,usePathname } from 'next/navigation'
import { useStore } from 'stores';
import { APP_INFOMATION } from '../constants';

export default function BazaarMenu({options,type} : {options:object,type:string}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { setLocale } = useStore();
    let selected = '';
    if(type === 'language'){
        selected = useStore(state => state.shopLocale.language);
    }else{
        selected = useStore(state => state.shopLocale.currency);
    }
    if(selected === undefined){
        selected = APP_INFOMATION.language;
    }
    const router = useRouter();
    const curPath = usePathname()?.replace(/\/[a-z]{2}\b/, "");
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        code: string,
    ) => {
        setLocale(type,code);
        if(type === 'language'){
            router.push(`/${code+curPath}`);
        }
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <List
                component="nav"
                aria-label="Device settings"
                sx={{ padding: '0px',cursor: 'pointer' }}
            >
                <ListItem
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                    sx={{ paddingTop: '6px',paddingBottom: '6px' }}
                >
                    <ListItemText primary={options?.filter((item) => item.code === selected)[0].name} />
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {options?.map((option) => (
                    <MenuItem
                        key={option.id}
                        disabled={option.code === selected}
                        selected={option.code === selected}
                        onClick={(event) => handleMenuItemClick(event, option.code)}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
