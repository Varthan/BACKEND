const { BaseActionWatcher } = require("demux")
const { NodeosActionReader } = require("demux-eos") 
const ObjectActionHandler = require("./ObjectActionHandler")
const updaters = require("./updaters")
const effects = require("./effects")

const actionHandler = new ObjectActionHandler(
  updaters,
  effects,
)
const actionReader = new NodeosActionReader(
  "http://127.0.0.1:8888",
  120361, // Start at most recent blocks 0
)
const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  500,
)

actionWatcher.watch()

module.exports = actionWatcher;