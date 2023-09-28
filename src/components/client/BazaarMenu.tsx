import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useStore } from 'stores';
import { ShopCurrency, ShopLanguage } from '@prisma/client';
import {useRouter,usePathname} from 'next-intl/client';

export default function BazaarMenu({type} : {type: 'language' | 'currency'}) {
    let selected = '';
    let dataList : ShopCurrency[] | ShopLanguage[] = [];
    if(type === 'language'){
        selected = useStore(state => state.shopLocale.language);
        dataList = useStore(state => state.shopLocale.languages);
    }else{
        selected = useStore(state => state.shopLocale.currency);
        dataList = useStore(state => state.shopLocale.currencies);
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { setLocale } = useStore() as { setLocale: (type: 'language' | 'currency', code: string) => void };
    const router = useRouter();
    const pathname = usePathname();
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        code: string,
    ) => {
        if(type === 'language'){
            router.push(pathname, {locale: code});
        }else{        
            setLocale(type,code);
            setAnchorEl(null);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return selected !== '' && dataList !== undefined && dataList.length > 0 ? 
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
                        <ListItemText primary={dataList.filter((item) => item.code === selected)[0].name} />
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
                    {dataList.map((option) => (
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
            ) : <></>;
}
