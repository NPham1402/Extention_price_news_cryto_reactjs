import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import NewspaperIcon from '@mui/icons-material/Newspaper';
function ComponentIteamNew(props) {
    return (
        <div>
                  <ListItemButton alignItems="flex-start" onClick={()=>{window.open(props.data.url)}}>
        <ListItemAvatar>
          <Avatar alt={props.data.domain}>
            <NewspaperIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.data.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {props.data.published_at}
              </Typography>
              {" "+props.data.domain}
            </React.Fragment>
          }
        />
      </ListItemButton>
      <Divider variant="inset" component="li" />
        </div>
    );
}

export default ComponentIteamNew;