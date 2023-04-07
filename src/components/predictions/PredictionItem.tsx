import { Box, Typography } from "@mui/material";
import { CurrentPrediction } from "../../interfaces"
import { getCountryShortName } from "../../utils";

interface LiveScore {
  matchID: string,
  awayTeam: string,
  awayTeamScore: number,
  homeTeam: string,
  homeTeamScore: string,
  matchTime: string
}
interface Props {
  prediction: CurrentPrediction;
  liveScore?: LiveScore | null;
}

export const PredictionItem = ({ prediction, liveScore }: Props) => {
  const { HomeTeam, AwayTeam } = prediction;
  const homeTeamScore = prediction.HomeTeamScore === null ? '' : prediction.HomeTeamScore;
  const awayTeamScore = prediction.AwayTeamScore === null ? '' : prediction.AwayTeamScore;
  const homeTeamShort = getCountryShortName(HomeTeam).toLowerCase();
  const awayTeamShort = getCountryShortName(AwayTeam).toLowerCase();
  return (
    <Box key={prediction.MatchNumber}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6'><img height='15' src={`https://flagcdn.com/${homeTeamShort}.svg`} /> {HomeTeam} - <img height='15' src={`https://flagcdn.com/${awayTeamShort}.svg`} /> {AwayTeam}</Typography>
        {liveScore ? <Typography variant='h6'>{liveScore.homeTeamScore} - {liveScore.awayTeamScore} [{liveScore.matchTime}]</Typography> : <Typography variant='h6'>{homeTeamScore} - {awayTeamScore}</Typography>}
      </Box>
      {prediction.users.map(u => {
        const uHomeTeamScore = u.HomeTeamScore === undefined ? '' : u.HomeTeamScore;
        const uAwayTeamScore = u.AwayTeamScore === undefined ? '' : u.AwayTeamScore;
        return <Box key={u.uid} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{u.displayName}</Typography>
        <Typography>{uHomeTeamScore} - {uAwayTeamScore}</Typography>
      </Box>
          
      })}
    </Box>
  )
}