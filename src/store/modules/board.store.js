// import authService from '../../services/auth.service.js'
import boardService from '../../services/board-service.js'

export default {
  state: {
    // user: userService.getLoggedInUser(),
    boards: null,
    board: null,
  },
  getters: {
    boards({ boards }) {
      return boards
    },
    board({ board }) {
      return JSON.parse(JSON.stringify(board))
    },
  },
  mutations: {
    loadBoard(state, { id }) {
      const board = state.boards.find(
        (board) => board._id === id
      )
      if (board) state.board = board
      else
        console.log(
          'Board store could not load board- ' + id
        )
    },
    setBoards(state, { boards }) {
      state.boards = boards
    },
    addTask(state, { groupIdx, savedTask }) {
      state.board.groups[groupIdx].tasks.push(savedTask)
    },
    updateTask(state, { groupId, updatedTask }) {
      const groupIdx = state.board.groups.findIndex(
        (group) => group.id === groupId
      )
      const group = state.board.groups[groupIdx]
      const taskIdx = group.tasks.findIndex(
        (task) => task.id === updatedTask.id
      )
      state.board.groups[groupIdx].tasks[taskIdx] =
        updatedTask
    },
    saveBoard(state, { savedBoard }) {
      const idx = state.boards.findIndex(
        (board) => board._id === savedBoard._id
      )
      if (idx !== -1)
        state.boards.splice(idx, 1, savedBoard)
      else state.boards.push(savedBoard)
    },
  },
  actions: {
    async updateTask({ commit, state }, { data }) {
      const { cmpType, groupId } = data
      var { task } = data
      task = JSON.parse(JSON.stringify(task))
      switch (cmpType) {
        case 'timeline-picker':
          task.timeline = data.timeline
          await boardService.saveTask(
            state.board._id,
            groupId,
            task
          )
          break
        case 'file-picker':
          break
        case 'member-picker':
          break
        case 'priority-picker':
          break
        case 'status-picker':
          break
        case 'tag-picker':
          break
        case 'title-picker':
          task.title = data.title
          await boardService.saveTask(
            state.board._id,
            groupId,
            task
          )
          break
      }
      commit({
        type: 'updateTask',
        groupId,
        updatedTask: task,
      })
    },
    async saveTask({ commit, state }, { groupId, task }) {
      var savedTask = null
      const idx = state.board.groups.findIndex(
        (group) => group.id === groupId
      )
      if (idx !== -1) {
        savedTask = await boardService.saveTask(
          state.board._id,
          groupId,
          task
        )
      }
      console.log('savedTask', savedTask)
      commit({
        type: 'addTask',
        groupIdx: idx,
        savedTask,
      })
      // group.tasks.push(savedTask)
    },
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query()
        commit({ type: 'setBoards', boards })
      } catch (err) {
        console.log(
          'BoardsStore: Had problems while loading the boards'
        )
      }
    },
    async saveBoard(context, { board }) {
      try {
        const savedBoard = await boardService.saveBoard(
          board
        )
        context.commit({
          type: 'saveBoard',
          board: savedBoard,
        })
      } catch (err) {
        console.log('saveBoard err', err)
      }
    },
  },
}
