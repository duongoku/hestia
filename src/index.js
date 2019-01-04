import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import GlobalStatusBar from './globalStatusBar/globalStatusBar.js'
import Scoreboard from './scoreboard/scoreboard.js'
import Sidenav from './sidenav/sidenav.js';
import { Button } from '@material-ui/core';

class Hestia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen : false
        }
    }
    render() {
        return (
            <>
                <GlobalStatusBar contestName="Kỳ thi 1" currentUser="Test User"
                    contestTimeLeft="00:00:00" contestDuration="23:59:59" loggedIn={true}
                    menuOpen={() => this.setState({
                        sidebarOpen : true
                    })}/>
                <Sidenav open={this.state.sidebarOpen} onClose={() => this.setState({
                    sidebarOpen: false
                })} pages={[
                    <Button onClick={() => alert(1)}>Alert (1)</Button>
                ]} />
                
                <Scoreboard obj={{

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

                }}/>
            </>
        )
    }
}

ReactDOM.render(<Hestia/>, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
