import * as tableService from "../services/tableService"

export async function checkMatch(mth, matchData) {
 
  const getUpdatedData = async (id) =>  {
    console.log(id);
    return await tableService.findOne(id)
  }
    console.log(matchData)
  
  function compareBooleanArrays(arr1, arr2) {
    const countBooleans = (arr) => {
      return arr.reduce(
        (count, value) => {
          if (value === true) count.true++
          if (value === false) count.false++
          return count
        },
        { true: 0, false: 0 }
      )
    }

    const count1 = countBooleans(arr1)
    const count2 = countBooleans(arr2)
    
    return count1.true === count2.true && count1.false === count2.false
  }
  if (mth == 1) { 
    let updatedData = await getUpdatedData(matchData._id)
    console.log(updatedData)

    let test1 = compareBooleanArrays(
      updatedData.awayMatch1.player1Wins,
      updatedData.homeMatch1.player1Wins
    )
    let test2 = compareBooleanArrays(
      updatedData.awayMatch1.player2Wins,
      updatedData.homeMatch1.player2Wins
    )
    if(test1 == true && test2 == true) return true
    if(test1 == false || test2 == false) return false
  }
  if (mth == 2) { 
    let updatedData = await getUpdatedData(matchData._id)
    console.log(updatedData)

    let test1 = compareBooleanArrays(
      updatedData.awayMatch2.player1Wins,
      updatedData.homeMatch2.player1Wins
    )
    let test2 = compareBooleanArrays(
      updatedData.awayMatch2.player2Wins,
      updatedData.homeMatch2.player2Wins
    )
    if(test1 == true && test2 == true) return true
    if(test1 == false || test2 == false) return false
  }
  if (mth == 3) { 
    let updatedData = await getUpdatedData(matchData._id)
    console.log(updatedData)

    let test1 = compareBooleanArrays(
      updatedData.awayMatch3.player1Wins,
      updatedData.homeMatch3.player1Wins
    )
    let test2 = compareBooleanArrays(
      updatedData.awayMatch3.player2Wins,
      updatedData.homeMatch3.player2Wins
    )
    if(test1 == true && test2 == true) return true
    if(test1 == false || test2 == false) return false
  }
}
