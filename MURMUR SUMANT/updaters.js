function parseMurmur(da){
  return {da} 
}

function updateTransferMurmur(state, payload, blockInfo, context) {
  const {  } = parseMurmur(blockInfo)
  state.totalTransaction += 1
}

const updaters = [
  {
    actionType: "murmur::murmur",
    updater: updateTransferMurmur,
  },
  {
    actionType: "murmur::yell",
    updater: updateTransferMurmur,
  },
  {
    actionType: "murmur::snoop",
    updater: updateTransferMurmur,
  },
  {
    actionType: "murmur::follow",
    updater: updateTransferMurmur,
  },
  {
    actionType: "murmur::whisper",
    updater: updateTransferMurmur,
  },
  {
    actionType: "murmur::comment",
    updater: updateTransferMurmur,
  },
]

module.exports = updaters
