import io from 'socket.io-client'

// WATCH
export const SOCKET_EMIT_BOARD_WATCH = 'board-watch'
export const SOCKET_EMIT_TASK_WATCH = 'task-watch'

// TASK CRUD
export const SOCKET_EMIT_TASK_UPDATED = 'update-task'
export const SOCKET_EMIT_TASK_ADD = 'add-task'
export const SOCKET_EMIT_REMOVE_TASK = 'remove-task'
export const SOCKET_EVENT_TASK_ADDED = 'task-added'
export const SOCKET_EVENT_TASK_REMOVED = 'task-removed'
export const SOCKET_EVENT_USER_UPDATED = 'user-updated'
// CMPS ORDER AND RENAMING
export const SOCKET_EMIT_EDIT_CMPS_ORDER = 'edit-cmps-order'
export const SOCKET_EVENT_CMPS_ORDER_EDITED =
  'cmps-order-edited'
export const SOCKET_EMIT_EDIT_TASKS_ORDER =
  'edit-tasks-order'
export const SOCKET_EVENT_TASKS_ORDER_EDITED =
  'tasks-order-edited'

//groups
export const SOCKET_EMIT_EDIT_GROUPS_ORDER =
  'edit-groups-order'
export const SOCKET_EVENT_GROUPS_ORDER_EDITED =
  'cmps-groups-edited'

//board
export const SOCKET_EMIT_SAVE_BOARD = 'save-board'
export const SOCKET_EVENT_BOARD_SEVED = 'board-saved'

// Updates
export const SOCKET_EMIT_ADD_UPDATE = 'add-update'
export const SOCKET_EVENT_UPDATE_ADDED = 'update-added'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? ''
    : '//localhost:3030'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// For DEBUG:
window.socketService = socketService

socketService.setup()

function createSocketService() {
  var socket = null
  const socketService = {
    async setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    },
  }
  return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    listenersMap,
    setup() {
      listenersMap = {}
      // window.mapmap = listenersMap
    },
    terminate() {
      this.setup()
    },
    on(eventName, cb) {
      listenersMap[eventName] = [
        ...(listenersMap[eventName] || []),
        cb,
      ]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      if (!cb) delete listenersMap[eventName]
      else
        listenersMap[eventName] = listenersMap[
          eventName
        ].filter((l) => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach((listener) => {
        listener(data)
      })
    },
    debugMsg() {
      this.emit('chat addMsg', {
        from: 'Someone',
        txt: 'Aha it worked!',
      })
    },
  }
  return socketService
}

// Basic Tests
function cb(x) {
  console.log('Got Baba:', x)
}
socketService.on('baba', cb)
socketService.on('mama', console.log)
// socketService.on('mama', alert)
// socketService.emit('baba', 'DATA123')
// socketService.off('baba', cb)
