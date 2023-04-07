import { Box,Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Match, PredictionMatch } from '../../interfaces'
import { auth } from '../../service/firebase';
import { Loading } from '../ui/Loading';
import { MatchItem } from './MatchItem'


export const MatchList = () => {

    const [user] = useAuthState(auth);

    const [matches, setMatches] = useState([] as Match[]);
    const [matchesPrediction, setMatchesPrediction] = useState([] as PredictionMatch[]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const serverURI = `${import.meta.env.VITE_SERVER_PRODE}/api`;

        axios.get(`${serverURI}/matches`).then(data => {

            const matchesRes: Match[] = data.data;

            matchesRes.sort((a,b) => {
                const aDate = new Date(a.DateUtc).getTime();
                const bDate = new Date(b.DateUtc).getTime();

                if (a.AwayTeamScore === null && b.AwayTeamScore === null){
                    return aDate - bDate;
                }
                else return -1;
            });

            setMatches(data.data)
        }).catch(err => {
            console.log('Error: ', err);
        });

        if (user === null || user === undefined) return;

        axios.get(`${serverURI}/users/${user.uid}/results`).then(data => {
            setMatchesPrediction(data.data.results);
            setLoading(false);
        });

    }, [user])
    
  return (
    <>{loading ? <Loading /> :
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        marginTop: '20px'
    }}>
        <Typography variant='h4' align='center'>Predictions</Typography>
    {matches.map(match => {

        const matchDefault: PredictionMatch = {
            MatchNumber: match.MatchNumber,
            HomeTeamScore: null,
            AwayTeamScore: null,
            result: 'not-started'
        }
        const matchPrediction = matchesPrediction.find(m => m.MatchNumber === match.MatchNumber) || matchDefault;
        
        return <MatchItem 
            key={match.MatchNumber}
            match={match}
            matchPrediction={matchPrediction}
        />
    }
    )}
    </Box>
    } </>
  )
}
