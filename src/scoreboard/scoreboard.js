import React from "react";
import ReactDOM from "react-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@material-ui/core";
import Sorting from "./Sorting.js";
import "./styles.css";

let Team = ["GHTH01", "GHTH02", "GHTH03", "GHTH04", "GHTH05"];
let Team_Score = [250, 200, 150, 100, 150];
let Team_Penalty = [42000, 50000, 23423, 24242, 24244];
// let Problem_List = ["A1", "B2", "C3"];
// let Problem_Score = [
//   { A1: 1, B2: 2, C3: 3 },
//   { A1: 4, B2: 5, C3: 6 },
//   { A1: 7, B2: 8, C3: 9 }
// ];
let Subs = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
let obj = {
  columns: [
    { Header: "Team_Name", accessor: "name" },
    { Header: "Team_Score", accessor: "Score" },
    { Header: "Team_Penalty", accessor: "Penalty" }
  ]
};
class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    Team = Team.map((name, index) => {
      return {
        name: name,
        Score: Team_Score[index],
        Penalty: Team_Penalty[index],
        // Problem_Score: Problem_Score[index],
        // Subs: Subs[id],
        key: name,
        ref: `name${index}`
      };
    });
    this.state = { Team };
    // let l = Problem_List.length;
    // for (let i = 0; i < l; i++) {
    //   let Temp = { Header: "", accessor: "" };
    //   Temp.Header = Problem_List[i];
    //   Temp.accessor = Problem_List[i];
    //   obj.columns.push(Temp);
    // }
    console.log(obj.columns);
    console.log(1);
  }
  /*
  handleChange(fromIndex, toIndex)
  thằng vừa submit từ rank fromIndex -> rank toIndex, xóa và nhét nó vào vị trí mới = splice
  */
  handleChange(fromIndex) {
    let toIndex = parseInt(Math.random() * 5);
    let newArray = this.state.Team.slice(0);

    newArray.splice(toIndex, 0, newArray.splice(fromIndex, 1)[0]);
    this.setState({ Team: newArray });
  }
  render() {
    /*
    In ra cái thanh <TableHead>
    */
    console.log(obj.columns);
    let headers = obj.columns.map(Column_Name => {
      return <TableCell>{Column_Name.Header}</TableCell>;
    });
    let data_Table = this.state.Team.map(Team => {
      // if()
      return (
        <TableRow>
          {obj.columns.map(CellData => {
            return <TableCell>{Team[CellData.accessor]}</TableCell>;
          })}
        </TableRow>
      );
    });
    return (
      <Table>
        <TableHead>{headers}</TableHead>
        <Sorting
          Teams={this.state.Team}
          columns={obj.columns}
          onBoardClick={this.handleChange.bind(this)}
        />
      </Table>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ScoreBoard />, rootElement);
