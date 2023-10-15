import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useStore } from 'stores';
import { ShopCurrency } from '@prisma/client';

export default function CurrencyMenu({locale,currencies} : {locale?: string, currencies?: ShopCurrency[]}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { setCurrency } = useStore() as { setCurrency: (code: string) => void };
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        code: string,
    ) => {
        setCurrency(code);
        setAnchorEl(null);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return locale !== '' && currencies !== undefined && currencies.length > 0 ? 
            (
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
                        <ListItemText primary={currencies.filter((item) => item.code === locale)[0].name} />
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
                    {currencies.map((option) => (
                        <MenuItem
                            key={option.id}
                            disabled={option.code === locale}
                            selected={option.code === locale}
                            onClick={(event) => handleMenuItemClick(event, option.code)}
                        >
                            {option.name}
                        </MenuItem>
                    ))}
                </Menu>
            </>
            ) : <></>;
}
