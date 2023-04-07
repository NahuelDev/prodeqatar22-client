import axios from "axios";
import { result, Match, PredictionMatch } from "../interfaces";

const countries = {
    "AR": "Argentina",
    "AU": "Australia",
    "BE": "Belgium",
    "BR": "Brazil",
    "CA": "Canada",
    "CH": "Switzerland",
    "CM": "Cameroon",
    "CR": "Costa Rica",
    "DE": "Germany",
    "DK": "Denmark",
    "EC": "Ecuador",
    "ES": "Spain",
    "FR": "France",
    "GB-ENG": "England",
    "GB-WLS": "Wales",
    "GH": "Ghana",
    "HR": "Croatia",
    "IR": "Iran",
    "JP": "Japan",
    "KR": "Korea Republic",
    "MA": "Morocco",
    "MX": "Mexico",
    "NL": "Netherlands",
    "PL": "Poland",
    "PT": "Portugal",
    "QA": "Qatar",
    "RS": "Serbia",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "TN": "Tunisia",
    "US": "USA",
    "UY": "Uruguay",
}

const getResult = (match: Match): result => {
    const { DateUtc, HomeTeamScore, AwayTeamScore } = match;

    if (HomeTeamScore === null || AwayTeamScore === null) {
        const currentDate = new Date();
        const matchDate = new Date(DateUtc);

        if (currentDate < matchDate) return "not-started";
        return "playing";
    }

    if (HomeTeamScore > AwayTeamScore) return "team1";
    if (HomeTeamScore < AwayTeamScore) return "team2";
    return "draw";
}

const getResultPrediction = (match: PredictionMatch): result => {
    const { HomeTeamScore, AwayTeamScore } = match;

    if (HomeTeamScore === null || AwayTeamScore === null) return "not-started";
    else if (HomeTeamScore > AwayTeamScore) return "team1";
    else if (HomeTeamScore < AwayTeamScore) return "team2";
    return "draw";
}

function getCountryShortName(val: string): string {
    if (!countries) return '';
    const keyPair = Object.entries(countries);

    const findRes = keyPair.find(i => i[1] === val);

    if (!findRes) return '';

    return findRes[0];
}

const getMatches = async (): Promise<Match[]> => {
    const matchesURI = `${import.meta.env.VITE_SERVER_PRODE}/api/matches`;

    const matches : Match[] = (await axios.get(matchesURI)).data!;
    
    return matches;
}

const getMatchesPrediction = (): PredictionMatch[] => {
    const matches : PredictionMatch[] = JSON.parse(localStorage.getItem('matches')!) || [];
    return matches;
}

const saveMatchPrediction = async (userID: string, match: PredictionMatch) => {
    const userURI = `${import.meta.env.VITE_SERVER_PRODE}/api/users`;
    
    await axios.put(`${userURI}/${userID}`, {
        match
    });

};

const setMatchPrediction = (matchID: number,matchPrediction: PredictionMatch | null): PredictionMatch => {
    
    const res : PredictionMatch = {
        MatchNumber: matchPrediction?.MatchNumber || matchID,
        HomeTeamScore: matchPrediction?.HomeTeamScore || null,
        AwayTeamScore: matchPrediction?.AwayTeamScore || null,
        result: matchPrediction?.result || "not-started"
    }

    return res;
}

const isAlreadyStarted = (matchDate: string): boolean => {
    const matchTime = new Date(matchDate);
    const timeNow = new Date();

    return matchTime <= timeNow;
}
export {
    getResult,
    getCountryShortName,    
    getResultPrediction,
    saveMatchPrediction,
    getMatchesPrediction,
    setMatchPrediction,
    getMatches,
    isAlreadyStarted
}