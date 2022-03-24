// import authService from '../../services/auth.service.js'
import boardService from '../../services/board-service.js'

export default {
  state: {
    // user: userService.getLoggedInUser(),
    boards: null,
    board: null,
    isDraggingGroup: false,
  },
  getters: {
    boards({ boards }) {
      return JSON.parse(JSON.stringify(boards))
    },
    board({ board }) {
      return JSON.parse(JSON.stringify(board))
    },
  },
  mutations: {
    toggleGroupDragMode(state) {
      state.isDraggingGroup = !state.isDraggingGroup
    },
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
    removeBoard(state, { boardId }) {
      const idx = state.boards.findIndex(
        (board) => board._id === boardId
      )
      state.boards.splice(idx, 1)
    },
    setTasksOrder(state, { result, idx }) {
      state.board.groups[idx].tasks = result
    },
    saveGroups(state, groups) {
      state.board.groups = groups
    },
    setGroupsOrder(state, { newOrder }) {
      state.board.groups = newOrder
    },
  },
  actions: {
    async onSetFilter({ commit, state }, { filterBy }) {
      filterBy.boardId = state.board._id
      const groups = await boardService.query(filterBy)
      commit('saveGroups', groups)
    },
    async applyDrag(
      { commit, state },
      { tasksOrder, dragResult, groupId }
    ) {
      tasksOrder = JSON.parse(JSON.stringify(tasksOrder))

      const { removedIndex, addedIndex, payload } =
        dragResult
      var result = [...tasksOrder]
      if (!removedIndex && !addedIndex) {
        result = tasksOrder
      } else {
        let itemToAdd = payload
        if (removedIndex !== null) {
          itemToAdd = result.splice(removedIndex, 1)[0]
        }
        if (addedIndex !== null) {
          result.splice(addedIndex, 0, itemToAdd)
        }
      }
      const idx = state.board.groups.findIndex(
        (group) => group.id === groupId
      )
      commit({ type: 'setTasksOrder', result, idx })
      await boardService.saveTasksOrder(
        state.board._id,
        idx,
        result
      )
    },
    async updateTask({ commit, state }, { data }) {
      const { cmpType, groupId } = data
      var { task } = data
      task = JSON.parse(JSON.stringify(task))
      switch (cmpType) {
        case 'timeline-picker':
          task.timeline = data.timeline
          await boardService.saveTask(
            state.board._id,
            groupId
          )
          break
        case 'file-picker':
          break
        case 'member-picker':
          await boardService.saveTask(
            state.board._id,
            groupId,
            task
          )
          break
        case 'priority-picker':
          task.priority = data.val
          await boardService.saveTask(
            state.board._id,
            groupId,
            task
          )
          break
        case 'status-picker':
          task.status = data.val
          await boardService.saveTask(
            state.board._id,
            groupId,
            task
          )
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
          savedBoard,
        })
      } catch (err) {
        console.log('saveBoard err', err)
      }
    },
    async removeBoard(context, { boardId }) {
      try {
        await boardService.removeBoard(boardId)
        context.commit({ type: 'removeBoard', boardId })
      } catch (err) {
        console.log('removeBoard err', err)
      }
    },
    changeOrderGroups(
      context,
      { dropResult, entities, entityType }
    ) {
      var board = JSON.parse(
        JSON.stringify(context.state.board)
      )
      var movedItem = entities.splice(
        dropResult.removedIndex,
        1
      )[0]
      entities.splice(dropResult.addedIndex, 0, movedItem)
      board[entityType] = entities
      context.dispatch({ type: 'saveBoard', board })
      context.commit({
        type: 'setGroupsOrder',
        newOrder: entities,
      })
    },
  },
}
