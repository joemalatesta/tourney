import * as matchService from "../services/matchService"

export async function checkMatch(matchId) {

  const getMatchData = async (matchId) => {
    return await matchService.findOne(matchId)
  }

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

  let updatedData = await getMatchData(matchId)

  console.log(updatedData);
  
  let test1, test2
  if (
    updatedData.player2WinsAway == null ||
    updatedData.player2WinsHome == null
  )
    return false
  test1 = compareBooleanArrays(
    updatedData.player1WinsAway,
    updatedData.player1WinsHome
  )

  test2 = compareBooleanArrays(
    updatedData.player2WinsAway,
    updatedData.player2WinsHome
  )

  
  if (test1 == true && test2 == true) return true
  if (test1 == false || test2 == false) return false
}
