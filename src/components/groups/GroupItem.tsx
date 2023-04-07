import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Group } from '../../interfaces';
import { getCountryShortName } from '../../utils';

interface Props {
    group: Group;
}

export const GroupItem = ({group}: Props) => {
    
    const teamOrder = group.teams.sort((a,b) => {
        const agd = a.gf - a.ga;
        const bgd = b.gf - b.ga;
        if (a.points !== b.points) return b.points - a.points;
        if (agd !== bgd ) return bgd - agd;
        return b.gf - a.gf;
    });

  return (
    <TableContainer component={Box} sx={{mt: 2, maxWidth:'100vw'}}>
        <Typography variant="h6" textAlign={'center'}>{group.name}</Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={20}>#</TableCell>
            <TableCell>Team</TableCell>
            <TableCell align='right'>P</TableCell>
            <TableCell>W</TableCell>
            <TableCell>D</TableCell>
            <TableCell>L</TableCell>
            <TableCell>GF/A</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamOrder.map((row, i) => {
            const shortName = getCountryShortName(row.name).toLowerCase();
            return (
            <TableRow
              key={row.name}
            >
                <TableCell>{i+1}</TableCell>
                <TableCell sx={{display: 'flex', gap: 1}}>
                    <img
                        src={`https://flagcdn.com/${shortName}.svg`}
                        height="20"
                        width="25"
                        alt={shortName}
                    />
                    <Typography> {row.name}</Typography>
                </TableCell>
                <TableCell align="center">{row.points}</TableCell>
                <TableCell align='center'>
                    {row.w}
                </TableCell>
                <TableCell align='center'>
                    {row.d}
                </TableCell>
                <TableCell align='center'>
                    {row.l}
                </TableCell>
                <TableCell align='center'>
                    {`${row.gf}/${row.ga}`}
                </TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
