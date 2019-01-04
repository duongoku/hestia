/*eslint-disable*/
import sortBy from 'sort-by';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper
} from "@material-ui/core";


/**
 * @Todo: adding motion and number of submission per problems.
 */

/*default data for example

    <Scoreboard obj={

        problem_code: ['A1','B2','C3'],

        data: [
            {handle: 'GHTH01', penalty:40000, A1: 70, B2: 100, C3: 85, subs: [3,2,2], total: -255},
            {handle: 'GHTH02', penalty:50000, A1: 100, B2: 50, C3: 50, subs: [1,2,2], total: -200},
            {handle: 'GHTH03', penalty:30000, A1: 0, B2: 100, C3: 100, subs: [0,2,3], total: -200},
        ],

        columns: [
            {Header: 'Handle', accessor: 'handle'},
            {Header: 'Penalty', accessor: 'penalty'},
            {Header: 'Total', accessor: 'total'},
        ],

    }/>

default data for example*/

/**
 * @name Scoreboard
 * @desc Process data to a scoreboard table
 * @param {Array} obj : An array containing objects satisfying the schema in the default data given above
 * @return {Table} : A scoreboard table <Scoreboard/>
*/

class Scoreboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.obj;
        // this.state = obj; //default data

        const problems = this.state.problem_code.length;
        for(let i = 0; i < problems; i++) {
            let temp = {Header: '', accessor: ''};
            temp.Header = this.state.problem_code[i];
            temp.accessor = this.state.problem_code[i];
            this.state.columns.push(temp);
        }
    }

    render() {
        this.state.data.sort(sortBy('total', 'penalty'));
        //Headers
        let headers = this.state.columns.map((Headers) => {
            return(
                <TableCell>{Headers.Header}</TableCell>
            );
        });
        //Table's body data
        let data_table = this.state.data.map((RowData) => {
            return(
                <TableRow>{
                this.state.columns.map((CellData) => {
                    if(CellData.accessor=='total')
                    return(<TableCell>{-RowData[CellData.accessor]}</TableCell>);
                    else
                    return(<TableCell>{RowData[CellData.accessor]}</TableCell>);
                })
                }</TableRow>
            );
        });
        return(
            <Paper>
                <Table>
                    <TableHead>{headers}</TableHead>
                    <TableBody>{data_table}</TableBody>
                </Table>
            </Paper>
        )
    }
}

export default Scoreboard;
