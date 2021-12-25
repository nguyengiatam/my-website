class Engine{

    constructor(){
        this._listIndexNumber = [];
    }

    createData() {
        let number = 0;
        let data;
        while (true) {
            number++;
            data = [[], [], [], [], [], [], [], [], []];
            for (let i = 1; i < 10; i++) {
                this.addValueToData(this.getIndexList(data), data, i);
            }
            if (this.checkData(data)) {
                break;
            }
        }
        console.log(`Số vòng lặp để tạo ra data ${number}`);
        return data;
    }

    addValueToData (listIndex, data, value) {
        for (let i = 0; i < data.length; i++) {
            data[i][listIndex[i]] = value;
        }
    }

    getIndexList(data) {
        let listIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let result = [];
        for (let i = 0; i < 9; i++) {
            let qualifiedIndexList = this.getQualifiedIndex(data, i, result, listIndex.slice());
            let value = qualifiedIndexList[this.getRandom(qualifiedIndexList.length)]
            listIndex.splice(listIndex.findIndex(element => element == value), 1);
            result.push(value);
        }
        return result;
    }

    getQualifiedIndex(data, index, listResult, listIndex) {
        
        for (let i = 0; i < index; i++) {
            if(this.checkSameCoordinates(i, index)){
                let j = 0;
                while (j <= listIndex.length) {
                    if (this.checkSameCoordinates(listIndex[j], listResult[i])) {
                        listIndex.splice(j, 1);
                        continue;
                    }
                    j++;
                }
            }
        }
        this.removeIndexExist(listIndex, data, index);
        //this.removeSimilarity(index, listIndex, listResult);
        return listIndex;
    }
    
    removeIndexExist(listIndex, data, row) {
        for (let i = 0; i < 9; i++) {
            if(data[row][i]){
                let index = listIndex.findIndex(element => element === i);
                if(index != -1){
                    listIndex.splice(index, 1);
                }
            }
        }
    }

    removeSimilarity(row, listIndex, listResult){
        for (let i = 0; i < row; i++) {
            if (this.checkSimilar(i, row)) {
                for (let j = 0; j < listIndex.length; j++) {
                    if (this.checkSimilar(listIndex[j], listResult[i])) {
                        listIndex.splice(j, 1);
                    }
                }
            }
        }
    }

    checkSameCoordinates (value_1, value_2) {
        if(Math.floor(value_1/3) == Math.floor(value_2/3)){
            return true;
        }
        return false;
    }

    checkSimilar(row1, row2){
        if(row1 % 3 == row2 % 3){
            return true;
        }
        return false;
    }

    checkData(data){
        for (const row of data) {
            for (const col of row) {
                if (!col) {
                    return false;
                }
            }
        }
        return true;
    }

    getRandom(max) {
        return Math.floor(Math.random() * max);
    }
}
