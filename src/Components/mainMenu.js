import { Link } from "react-router-dom"
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { Home, HomeIcon } from '@mui/icons-material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleIcon from '@mui/icons-material/People';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import '../App.css' 
const MainMenuComp = () => {
    console.log("MainMenuComp")
    return <Drawer
            anchor="top"
            open={true}
            variant="persistent">
            <List style={{display: "flex",  justifyContent: "center"}}>
                <Link style={{textDecoration: "none"}} to="products">
                    <ListItem>
                        <ListItemIcon>
                            <LocalOfferIcon />
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                    </ListItem>
                </Link>
                <Link style={{textDecoration: "none"}} to="customers">
                    <ListItem>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Customers"/>
                    </ListItem>
                </Link>
                <Link style={{textDecoration: "none"}} to="purchases">
                    <ListItem>
                        <ListItemIcon>
                            <LocalMallIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Purchases"/>
                    </ListItem>
                </Link>
            </List>
        </Drawer>
}
export default MainMenuComp
