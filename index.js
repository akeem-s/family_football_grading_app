const csv = require('csvtojson')
const jsonfile = require('jsonfile')
const participantArray = []
var week = "week_1"
var csv_file = "./week_1_picks.csv"
const weekCorrectArray = [{ '1': 'broncos'},
   {'2': 'buccaneers'},
   {'3': 'vikings'},
   {'4': 'eagles'},
   {'5': 'bengals'},
   {'6': 'raiders'},
   {'7': 'chiefs'},
   {'8': 'ravens'},
   {'9': 'texans'},
   {'10': 'packers'},
   {'11': 'dolphins'},
   {'12': 'giants'},
   {'13': 'lions'},
   {'14': 'patriots'},
   {'15': 'steelers'},
   {'16': '49ers'}]
const _ = require('lodash')

const printStandings = (participantArray) => {
  const sortedArray = _.sortBy(participantArray, ['wins']).reverse()
}

const parseCsv = () => {
 csv()
 .fromFile(csv_file)
 .on('json',(jsonObj)=>{
   participantArray.push(jsonObj)
 })
 .on('done',( error)=>{
   jsonfile.writeFile("./json/"+week+".js", participantArray, {flag: 'a'}, function (err) {
     if(err){
     }
   })
   gradePicks(participantArray)
 })
}

const gradePicks = (participantArray) => {
  const contenderArray = []
  for(var i = 0; i < participantArray.length; i ++){
    participantArray[i].wins = 0;
    participantArray[i].losingTeams = [];
    participantArray[i].winningTeams = [];
      for(var j =1;  j < 16; j ++ ){
        var num = j.toString()
        if(weekCorrectArray[j - 1][num] == participantArray[i][num]){
          var sum = participantArray[i].wins + 1
          participantArray[i].wins = sum
          participantArray[i].winningTeams.push(weekCorrectArray[j - 1][num])
        }
        else{
          participantArray[i].losingTeams.push(weekCorrectArray[j - 1][num])
        }
      }
  }
  printStandings(participantArray)
}

parseCsv();
// gradePicks()
