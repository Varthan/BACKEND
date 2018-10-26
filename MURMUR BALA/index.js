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
  'http://18.191.181.219:8888',
  209400,
)
const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  500,
)

actionWatcher.watch()

module.exports = actionWatcher;
