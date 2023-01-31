export default function jsonToMysql(tableName, data) {
   if (!isIterable (data)){
      let keyArrStr = Object.keys(data).join();
      keyArrStr = "INSERT INTO " + tableName + "(" + keyArrStr + ") VALUES \n";
      let valueArr = Object.values(data);
      valueArr = valueArr.map(item => {
         if (!isNaN(item)){
            return +item;
         }
         return "'" + item + "'";
      });
      let valueArrStr = valueArr.join();
      valueArrStr = "(" + valueArrStr + ")";
      
      return keyArrStr + valueArrStr;
  }

  const len = data.length;
  let keyArrList = [];
  let keyNullArr = [];
  let valueArrList = [];
  let keyAdd = false;
  for (let i = 0; i < len; i++){
      if (i == 0){
         keyArrList = Object.keys(data[i]);
         let valueArr = Object.values(data[i]);
         valueArr = valueArr.map((item, index) => {
            if (!isNaN(item)){
               keyNullArr[index] = null;
               return +item;
            }
            keyNullArr[index] = '';
            return "'" + item + "'";
         });
         valueArrList.push(valueArr);
      }else{
         //Check Object.keys(data[i])
         let keyArr = Object.keys(data[i]);
         keyArr.forEach((item, index) => {
             if (keyArrList.indexOf(item) < 0){
                keyArrList.push(item);
                keyAdd = true;
                let val = Object.values(data[i])[index];
                let valNull;
                if (isNaN(val)){
                  valNull = '';
                }else{
                  valNull = null;
                }
                keyNullArr.push(valNull);
                for (let j = 0; j < i; j++){
                   valueArrList[j].push(valNull);
                }
             }
         });
         if (!keyAdd){
            let valueArr = Object.values(data[i]);
            valueArr = valueArr.map(item => {
               if (!isNaN(item)){
                  return +item;
               }
              return "'" + item + "'";
            });
            valueArrList.push(valueArr);
         }else{
             let valueArr = [];
             keyArrList.forEach(item => {
                let val = data[i][item];
                if (isNaN(val)){
                   valueArr.push("'" + val + "'")
                }else{
                   valueArr.push(+val);
                }
             });
             valueArrList.push(valueArr);
         }
      }
  }
  let keyArrStr = keyArrList.join();
  keyArrStr = "INSERT INTO " + tableName + "(" + keyArrStr + ") VALUES \n";
  valueArrList = valueArrList.map(item => "(" + item.join()  + ")");
  let valueArrStr = valueArrList.join(',\n');
  return keyArrStr + valueArrStr;
}

function isIterable (value) {
   return Symbol.iterator in Object(value);
}
