import { Summoner, MatchHistory } from '../model/schema.js'

// 사용자 이름으로 찾기
export async function findBySummonerName(summonerName) {
  return Summoner.findOne({ summonerName })
}

// 아이디로 찾기
export async function findById(id) {
  return Summoner.findById(id)
}

// 아이디로 매치 찾기
export async function findByMatchId(id) {
  return MatchHistory.findById(id)
}

// 새롭게 검색한 소환사 정보 추가
export async function createSummoner(summoner) {
  return new Summoner(summoner) //
    .save()
    .then((data) => data.id)
    .catch((err) => console.log(err))
}

/**새롭게 검색한 소환사의 전적 정보 추가 */
export async function createMatchHistory(matchHistory) {
  // 중복체크 (MatchId 값이 같은 값이 있는지 확인)
  const id = matchHistory.matchId
  console.log('id: ', id)
  const overlaped = MatchHistory.findOne({ matchId: id })
  console.log('overlaped: ', overlaped)
  console.log('overlaped-type: ', typeof overlaped)
  console.log('overlaped.id: ', overlaped.id)
  if (overlaped.id !== undefined) return overlaped.id

  return await new MatchHistory(matchHistory) //
    .save()
    .then((data) => data.id)
    .catch((err) => console.log(err))
}

export async function updateRank(name, rank) {
  const filter = { summonerName: name }

  return await Summoner.findOneAndUpdate(filter, rank, {
    returnDocument: 'after',
  })
}

export async function deleteHistory(matchId) {
  return await MatchHistory.deleteOne({ matchId: matchId })
}
