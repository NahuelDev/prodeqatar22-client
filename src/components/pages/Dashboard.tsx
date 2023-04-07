import {Box, Grid, Card, CardMedia, Typography, CardActionArea, CardContent} from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
export const Dashboard = () => {

  const navigate = useNavigate();

  return (
    <Grid container justifyContent='center' spacing={4}>
            <Grid item xs={5}>
                <CardActionArea 
                sx={{
                    backgroundColor: '#8A1538',
                    p:2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 3,
                    mt:2,
                    height: '100%'
                }}
                onClick={() => navigate('/predictions')}>
                   
                    <img src='/predictions.png' width={'100%'}/>
                    <Typography variant='h6' color='#fff'>Predictions</Typography>
                </CardActionArea>
            </Grid>
            <Grid item xs={5}>
                <CardActionArea 
                sx={{
                    backgroundColor: '#8A1538',
                    p:2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 3,
                    mt:2,
                    height: '100%'
                }}
                onClick={() => navigate('/leaderboard')}>
                    <img src='/leaderboard.png' width={'100%'}/>
                    <Typography variant='h6' color='#fff'>Leaderboard</Typography>
                </CardActionArea>
            </Grid>
            <Grid item xs={5}>
                <CardActionArea 
                sx={{
                    backgroundColor: '#8A1538',
                    p:2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 3,
                    mt:2,
                    height: '100%'
                }}
                onClick={() => navigate('/groups')}>
                    <img src='/group.png' width={'100%'}/>
                    <Typography variant='h6' color='#fff'>Groups</Typography>
                </CardActionArea>
            </Grid>
    </Grid>
  )
}
