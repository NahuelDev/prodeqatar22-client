import { Box, CircularProgress } from "@mui/material"
import axios from "axios"
import { useState, useEffect } from "react"
import { Group } from "../../interfaces"
import { Loading } from "../ui/Loading"
import { GroupItem } from "./GroupItem"

export const GroupList = () => {
CircularProgress
    const [groups, setGroups] = useState([] as Group[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const groupURI = `${import.meta.env.VITE_SERVER_PRODE}/api/groups`;

      axios.get(groupURI).then(data => {
        setGroups(data.data);
        setLoading(false);
      }).catch(err => { console.log(err)});
    
    }, []);
    
  return (
    <>
      {loading ? <Loading /> :
      <Box>
          {groups.map(group=> <GroupItem key={group.name} group={group}/>)}
      </Box>}
    </>
  )
}
