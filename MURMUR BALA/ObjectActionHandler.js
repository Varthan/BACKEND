const { AbstractActionHandler } = require("demux")

const state = { murmurs: {}, totalTransaction: 0, indexState: { blockNumber: " 209400", blockHash: "" } } // Initial state

class ObjectActionHandler extends AbstractActionHandler {
  async handleWithState(handle) {
    await handle(state)
  }

  async loadIndexState() {
    return state.indexState
  }

  async updateIndexState(stateObj, block) {
    stateObj.indexState.blockNumber = block.blockInfo.blockNumber
    console.log("Info",stateObj.indexState.blockNumber);
    stateObj.indexState.blockHash = block.blockInfo.blockHash
  }
}

module.exports = ObjectActionHandler
