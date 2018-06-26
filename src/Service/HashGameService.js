
export const simbols = ['X', 'O'];

const _this = {
  hashCells: []
}

export default class {

  static init(hashCells) {
    _this.hashCells = hashCells;
  }

  static initHashCells(){
    _this.hashCells.forEach(hashCells => hashCells.resetValue());
  }

  static hasFinishedInDraw(){
    return !_this.anyBlank;
  }

  static currentPlayerWin(player) {
    const simbol = simbols[player];
    _this.anyBlank = false;
    const matchAll = index => {
      if(!_this.anyBlank && _this.hashCells[index].currentValue() === ''){
        _this.anyBlank = true;
      }      
      return _this.hashCells[index].currentValue() === simbol
    }
    return [0, 4, 8].filter(matchAll).length === 3
      || [2, 4, 6].filter(matchAll).length === 3

      || [0, 1, 2].filter(matchAll).length === 3
      || [3, 4, 5].filter(matchAll).length === 3
      || [6, 7, 8].filter(matchAll).length === 3

      || [0, 3, 6].filter(matchAll).length === 3
      || [1, 4, 7].filter(matchAll).length === 3
      || [2, 5, 8].filter(matchAll).length === 3
  }

}