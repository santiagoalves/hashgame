import React, { Component } from 'react';
import HashCell from './Component/HashCell';
import HashGameService, { simbols } from './Service/HashGameService';
import './App.css';

const rows = ['top', 'midle', 'bottom'];
const columns = ['left', 'midle', 'right'];

class App extends Component {

  constructor() {
    super();
    this.state = {
      started: false,
      playerTurn: undefined
    };
    this.hashCells = {};
    rows.forEach(row =>
      columns.forEach(column =>
        this.hashCells[`${row}${column}`] = React.createRef()));
  }

  componentDidMount() {
    console.log('teste');
    HashGameService.init(Object.keys(this.hashCells).reduce((hashCells, keys) => {
      hashCells.push(this.hashCells[keys].current);
      return hashCells;
    }, []))
  }

  render() {

    const { started, playerTurn } = this.state;

    const notification = msg => window.setTimeout(() => window.alert(msg))

    const startHashGame = () => {
      this.setState({
        started: true,
        playerTurn: 0
      }, () => HashGameService.initHashCells())
    }

    HashGameService.verify = () => {
      let msg = '';

      if (HashGameService.currentPlayerWin(playerTurn)) {
        msg = `"${simbols[playerTurn]}" venceu!`;
      } else if (HashGameService.hasFinishedInDraw()) {
        msg = 'Terminou em empate!';
      }

      if (msg) {
        this.setState({ started: false }, () => notification(msg));
      } else {
        this.setState({ playerTurn: playerTurn ^ 1 });
      }
    }

    return (
      <div className="hash-board">
        <table>
          <tbody>
            {
              rows.map(row => (
                <tr key={row} className={`${row} row`}>{
                  columns.map(column => (
                    <HashCell whenUpdateValue={HashGameService.verify} playerTurn={playerTurn}
                      ref={this.hashCells[`${row}${column}`]} started={started}
                      className={`${column} column`} key={column} />
                  ))
                }</tr>
              ))
            }
          </tbody>
        </table>
        <hr />
        <br />
        <button onClick={startHashGame} disabled={started}> Start </button>
      </div>
    );
  }
}

export default App;
