import { Box, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Match, PredictionMatch } from '../../interfaces';
import { getCountryShortName, getResultPrediction, isAlreadyStarted, saveMatchPrediction, setMatchPrediction } from '../../utils';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { auth } from '../../service/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props {
    match: Match,
    matchPrediction: PredictionMatch;
}
export const MatchItem = ({ match, matchPrediction }: Props) => {

    const [user] = useAuthState(auth);
    
    const predictionInitialState: PredictionMatch = setMatchPrediction(match.MatchNumber, matchPrediction);
    
    const shortNameTeamOne = getCountryShortName(match.HomeTeam).toLowerCase();
    const shortNameTeamTwo = getCountryShortName(match.AwayTeam).toLowerCase();

    const matchStarted = isAlreadyStarted(match.DateUtc);

    const [predictionMatch, setPredictionMatch] = useState(predictionInitialState);
    const [editMode, setEditMode] = useState(false);

    const onChangeGoal = (event:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, team: string) => {
        const naturalNumbersRegex = /^[0-9]{1}$/;
        const goals = event.target.value;
        
        if (goals === '') {
            setPredictionMatch({
                ...predictionMatch,
                [team]: ''
            });
            return;
        }
        
        if (!naturalNumbersRegex.test(goals)) return;
        
        setPredictionMatch({
            ...predictionMatch,
            [team]: Number(goals)
        })
    }

    useEffect(() => {
        
        // snackbar with error here.
      if (editMode || predictionMatch.HomeTeamScore === null|| predictionMatch.AwayTeamScore === null) return;

      const result = getResultPrediction(predictionMatch);

      setPredictionMatch(prevState => {
        const match = {
            ...prevState,
            result: result
        };

        if (user?.uid) saveMatchPrediction(user.uid, match);

        return match;
      });

      
    }, [editMode])

    useEffect(() => {
        setPredictionMatch(matchPrediction);
    }, [matchPrediction]);

    const changeEditMode = () => {
        setEditMode(prevState => !prevState);
    }

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    };

    const localTime = new Date(match.DateUtc).toLocaleString([], options);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#8A1538',
                justifyContent: 'center',
                alignItems: 'center',
                height: '120px',
                fontSize: '20px'
            }}>
                <Box sx={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: '100%',
                    width: "50%"
                }}>
                    <Box width='75%'>
                        {shortNameTeamOne && <img
                            src={`https://flagcdn.com/${shortNameTeamOne}.svg`}
                            width="60"
                            alt={shortNameTeamOne}
                        />}
                        <Typography color={'#fff'}>{match.HomeTeam}</Typography>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            color: '#000',
                            justifyContent: 'center',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            width: '25%',
                            mask: 'conic-gradient(from 40deg at left,#0000,#000 1deg 99deg,#0000 100deg) 50%/100% 10px',
                            borderRight: '1px solid #f0f0f0'
                        }}
                    >
                        {editMode ?
                            <TextField type="text"
                                
                                label="Edit"
                                color="warning"
                                variant="filled"
                                focused
                                onChange={(e) => {onChangeGoal(e, "HomeTeamScore")}} 
                                InputProps={{
                                    inputProps: {
                                        style: { textAlign: "center" },
                                    }
                                }}
                                value={predictionMatch.HomeTeamScore} 
                            />
                            : <Box sx={{
                                display:'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                height: '70%'
                            }}>
                                { match.HomeTeamScore && <Typography variant='h6'>{match.HomeTeamScore}</Typography> }
                                { !(predictionMatch.HomeTeamScore === null) && <Typography>({predictionMatch.HomeTeamScore})</Typography> }
                            </Box>
                        }
                    </Box>
                </Box>

                {!matchStarted && <IconButton onClick={changeEditMode}>
                    {editMode ?  <DoneIcon /> : <EditIcon />}
                </IconButton>}

                <Box
                    sx={{
                        textAlign: 'center',
                        display: 'flex',
                        width: "50%",
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#ffffff',
                            color: '#000',
                            justifyContent: 'center',
                            mask: 'conic-gradient(from -140deg at right,#0000,#000 1deg 99deg,#0000 100deg) 50%/100% 10px',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            width: '25%'
                        }}
                    >
                        {editMode ?
                            <TextField type="text"
                                label="Edit"
                                color="warning"
                                variant="filled"
                                focused
                                onChange={(e) => {onChangeGoal(e, "AwayTeamScore")}} 
                                InputProps={{
                                    inputProps: {
                                        style: { textAlign: "center" },
                                    }
                                }}
                                value={predictionMatch.AwayTeamScore} 
                            />
                            : <Box sx={{
                                display:'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                height: '70%'
                            }}>
                                { match.AwayTeamScore && <Typography variant='h6'>{match.AwayTeamScore}</Typography> }
                                { !(predictionMatch.AwayTeamScore === null) && <Typography>({predictionMatch.AwayTeamScore})</Typography> }
                            </Box>
                        }
                    </Box>
                    <Box width='75%'>
                        {shortNameTeamTwo && <img
                            src={`https://flagcdn.com/${shortNameTeamTwo}.svg`}
                            width="60"
                            alt={shortNameTeamTwo}
                        />}
                        <Typography color={'#fff'}>{match.AwayTeam}</Typography>
                    </Box>
                </Box>
            </Box>
            <Typography textAlign={'center'} >{localTime}</Typography>
        </Box>
    )
}
