import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
// const [first, setfirst] = useState([]);
const useStyles = makeStyles((theme) => ({
  root: {
    width: "90vw", // 90% of viewport width
    margin: "auto",
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontFamily: "FunkFont, cursive",
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
    overflow: "auto", // Enable scrolling if needed
    textAlign: "center", // Center align all content
  },
  leaderboardTable: {
    width: "100%",
    marginBottom: theme.spacing(1),
    borderCollapse: "collapse",
  },
  tableHeader: {
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
  },
  columnHeader: {
    fontWeight: "bold",
    padding: theme.spacing(1),
  },
  leaderboardItem: {
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
    opacity: 0,
    transform: "translateX(-20px)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  },
  leaderboardItemVisible: {
    opacity: 1,
    transform: "translateX(0)",
  },
  cell: {
    padding: theme.spacing(1),
  },
  rank: {
    fontWeight: "bold",
    color: "fff",
  },
  name: {
    flexGrow: 1,
  },
  score: {
    fontWeight: "bold",
    color: "fff",
  },
}));

// const usersData = [
//   { id: 1, name: "John Doe", score: 150 },
//   { id: 2, name: "Jane Smith", score: 200 },
//   { id: 3, name: "Alice Johnson", score: 180 },
//   { id: 4, name: "Bob Williams", score: 120 },
//   { id: 5, name: "Sarah Davis", score: 160 },
// ];

function Leaderboard() {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [usersData, setusersData] = useState([]);
  const board = async () => {
    try {
      const resp = await axios.get("http://localhost:4000/api/rankings");
      console.log(resp.data);
      setusersData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setVisible(true);
  }, []);

  // Sort users based on score (highest to lowest)
  const sortedUsers = usersData.sort((a, b) => b.score - a.score);

  // Calculate the dynamic height based on the number of data entries
  const leaderboardHeight = `${sortedUsers.length * 60}px`;
  useEffect(() => {
    board();
  }, []);
  return (
    <Paper className={classes.root} style={{ height: leaderboardHeight }}>
      <table className={classes.leaderboardTable}>
        <thead>
          <tr className={classes.tableHeader}>
            <th className={classes.columnHeader}>ID</th>
            <th className={classes.columnHeader}>Name</th>
            <th className={classes.columnHeader}>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr
              key={user.id}
              className={`${classes.leaderboardItem} ${
                visible && classes.leaderboardItemVisible
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <td className={`${classes.cell} ${classes.rank}`}>{index + 1}</td>
              <td className={`${classes.cell} ${classes.name}`}>
                {user.firstName}
              </td>
              <td className={`${classes.cell} ${classes.score}`}>
                {user.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
}

export default Leaderboard;
