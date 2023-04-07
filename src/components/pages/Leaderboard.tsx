import { Box, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CurrentPrediction } from '../../interfaces';
import { PredictionList } from '../predictions/PredictionList';
import { Loading } from '../ui/Loading';

export const Leaderboard = () => {

    interface leaderboardRow {
        displayName: string;
        points: number;
        uid: string;
        x1: number;
        x3: number;
    }

    const [leaderboard, setLeaderboard] = useState([] as leaderboardRow[]);
    const [predictions, setPredictions] = useState([] as CurrentPrediction[]);
    const [loadingBoard, setLoadingBoard] = useState(true);
    const [loadingPredictions, setLoadingPredictions] = useState(true);

    useEffect(() => {
        const serverURI = `${import.meta.env.VITE_SERVER_PRODE}/api/leaderboard`;
        axios.get(serverURI).then(data => {
            setLeaderboard(data.data);
            setLoadingBoard(false);
        });

        axios.get(`${serverURI}/matches`).then(data => {
          const predOrder = data.data.sort((a: CurrentPrediction,b: CurrentPrediction) => new Date(b.DateUtc).getTime() - new Date(a.DateUtc).getTime());
          setPredictions(predOrder);
          setLoadingPredictions(false);
        });

    }, []);
    



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%'}}>
      { loadingBoard ? <Loading /> : <TableContainer component={Box}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width={20}>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align='center'>x3</TableCell>
              <TableCell align='center'>x1</TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((row, i) => (
              <TableRow
                key={row.uid}
              >
                  <TableCell size='small'>{i+1}</TableCell>
                <TableCell component="th" scope="row">
                  {row.displayName}
                </TableCell>
                <TableCell align='center'>{row.x3}</TableCell>
                <TableCell align='center'>{row.x1}</TableCell>
                <TableCell align='right'>{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      { loadingPredictions ? <Loading /> : <PredictionList predictions={predictions} /> }
    </Box>
  )
}
