import { Box } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { CurrentPrediction } from "../../interfaces"
import { PredictionItem } from "./PredictionItem";

interface Props {
    predictions: CurrentPrediction[];
}

interface LiveScore {
  matchID: string,
  awayTeam: string,
  awayTeamScore: number,
  homeTeam: string,
  homeTeamScore: string,
  matchTime: string
}

export const PredictionList = ({predictions}: Props) => {
  const [liveScores, setLiveScores] = useState([] as LiveScore[]);
  
  useEffect(() => {
    const livescoreURI = `${import.meta.env.VITE_SERVER_PRODE}/api/leaderboard/livescore`;
    axios.get(livescoreURI).then(data => {
        setLiveScores(data.data);
    });
    const intervalID = setInterval(() => {
      const livescoreURI = `${import.meta.env.VITE_SERVER_PRODE}/api/leaderboard/livescore`;
      axios.get(livescoreURI).then(data => {
        setLiveScores(data.data);
      });
    }, 60000);
    return () => clearInterval(intervalID);

  }, []);
  

  return (
    <Box sx={{width: '95%', margin:'0 auto' }}>
        {predictions.map(p => {
            let liveScore : LiveScore | null = null;
            if (p.AwayTeamScore === null && p.HomeTeamScore === null) {

              liveScores.forEach(m => {
                
                if (m.homeTeam === p.HomeTeam && m.awayTeam === p.AwayTeam){
                  
                  liveScore = {...m}
                }
              });
          } else liveScore = null
            return liveScore ? <PredictionItem key={p.MatchNumber} prediction={p} liveScore={liveScore} /> : <PredictionItem key={p.MatchNumber} prediction={p} />
          }
        )}
    </Box>
  )
}
