function parseMurmur(da){
  return {da} 
}

function updateTransferMurmur(state, payload, blockInfo, context) {
  const {  } = parseMurmur(blockInfo)
  state.totalTransaction += 1
}

const updaters = [
  {
    actionType: "murmurdapp::murmur",
    updater: updateTransferMurmur,
  },
  {
    actionType: "murmurdapp::yell",
    updater: updateTransferMurmur,
  },
  {
    actionType: "murmurdapp::snoop",
    updater: updateTransferMurmur,
  },
  {
    actionType: "eosmurmur1::follow",
    updater: updateTransferMurmur,
  },
  {
    actionType: "murmurdapp::whisper",
    updater: updateTransferMurmur,
  },
  {
    actionType: "murmurdapp::comment",
    updater: updateTransferMurmur,
  },
]

module.exports = updaters
