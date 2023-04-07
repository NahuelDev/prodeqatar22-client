type result = | "team1"
| "team2"
| "draw"
| "not-started"
| "playing";


interface Match {
    MatchNumber: number,
    RoundNumber: number,
    DateUtc: string,
    Location: string,
    HomeTeam: string,
    AwayTeam: string,
    Group: string | null,
    HomeTeamScore: number | null,
    AwayTeamScore: number | null
}
interface User {
    displayName: string;
    uid: string;
    MatchNumber: number;
    HomeTeamScore?: number;
    AwayTeamScore?: number;
    result: string;
  }
interface CurrentPrediction extends Match {
    users: User[]
}

interface PredictionMatch {
    MatchNumber: number,
    HomeTeamScore: number | null,
    AwayTeamScore: number | null,
    result: result
}

interface Team {
    name: string;
    points: number,
    w: number,
    d: number,
    l: number,
    gf: number,
    ga: number
}

interface Group {
    name: string;
    teams: Team[]
}

export type {
    Match,
    Group,
    result,
    PredictionMatch,
    Team,
    CurrentPrediction
}