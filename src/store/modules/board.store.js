// import authService from '../../services/auth.service.js'
import boardService from '../../services/board-service.js'
// import { socketService, SOCKET_EVENT_TASK_ADDED } from '../../services/socket.service.js'

export default {
  state: {
    isLoading: false,
    boards: null,
    board: null,
    boardForDisplay: null,
    isDraggingGroup: false,
    filterBy: {
      txt: '',
    },
  },
  getters: {
    boards({ boards }) {
      return boards
    },
    board({ boardForDisplay }) {
      return boardForDisplay
    },
    cmpsOrder({ board }) {
      return board.cmpsOrder
    },
    chartData({ board }) {
      var statusMapCount = null
      var priorityMapCount = null
      if (!board?.groups) return
      const groups = JSON.parse(
        JSON.stringify(board.groups)
      )
      groups.forEach((group) => {
        statusMapCount = group.tasks.reduce((acc, task) => {
          if (!task.status) return acc
          acc[task.status] = acc[task.status]
            ? acc[task.status]++
            : 1
          return acc
        }, {})
        priorityMapCount = group.tasks.reduce(
          (acc, task) => {
            if (!task.priority) return
            acc[task.priority] = acc[task.priority]
              ? acc[task.priority]++
              : 1
            return acc
          },
          {}
        )
      })
      return { statusMapCount, priorityMapCount }
    },
  },
  mutations: {
    loadBoards(state, { boards }) {
      state.boards = JSON.parse(JSON.stringify(boards))
    },
    loadBoard(state, { board }) {
      state.board = JSON.parse(JSON.stringify(board))
      state.boardForDisplay = JSON.parse(
        JSON.stringify(board)
      )
    },
    onSetFilter(state, { filterBy }) {
      state.filterBy = JSON.parse(JSON.stringify(filterBy))
      const board = JSON.parse(JSON.stringify(state.board))
      const regex = new RegExp(filterBy.txt, 'i')
      const filteredGroups = board.groups.filter(
        (group) => {
          if (regex.test(group.title)) return group
          const tasks = group.tasks.filter((task) =>
            regex.test(task.title)
          )
          group.tasks = tasks
          if (group.tasks.length > 0) return group
        }
      )
      state.boardForDisplay.groups = JSON.parse(
        JSON.stringify(filteredGroups)
      )
    },
    toggleGroupDragMode(state) {
      state.isDraggingGroup = !state.isDraggingGroup
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
      console.log('group, taskIdx', group, taskIdx)
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
      state.boardForDisplay.groups[idx].tasks = result
    },
    saveGroups(state, groups) {
      state.boardForDisplay.groups = groups
    },
    setGroupsOrder(state, { newOrder }) {
      state.boardForDisplay.groups = newOrder
    },
    setIsLoading(state, { isLoading }) {
      state.isLoading = isLoading
    },
    setCmpsOrder(state, { newOrder }) {
      state.boardForDisplay.cmpsOrder = newOrder
    },
  },
  actions: {
    async loadBoards({ commit }) {
      commit({ type: 'setIsLoading', isLoading: true })
      try {
        const boards = await boardService.query()
        commit({ type: 'loadBoards', boards })
      } catch (err) {
        console.log(
          'BoardsStore: Had problems while loading the boards'
        )
      } finally {
        commit({ type: 'setIsLoading', isLoading: false })
      }
    },
    async loadBoard(context, { id }) {
      context.commit({
        type: 'setIsLoading',
        isLoading: true,
      })
      try {
        const board = await boardService.getById(id)
        context.commit({ type: 'loadBoard', board })
      } catch (err) {
        console.log('loadBoard err', err)
      } finally {
        context.commit({
          type: 'setIsLoading',
          isLoading: false,
        })
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
    async updateTask({ commit, state }, { data }) {
      const { cmpType, groupId } = data
      var { task } = data
      task = JSON.parse(JSON.stringify(task))
      commit({
        type: 'updateTask',
        groupId,
        updatedTask: task,
      })
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
    },
    changeOrder(
      context,
      { dropResult, entities, entityType }
    ) {
      var board = JSON.parse(
        JSON.stringify(context.state.board)
      )
      entities = JSON.parse(JSON.stringify(entities))
      var groupId = ''
      if (entityType === 'tasks') {
        groupId = entities.groupId
        entities = entities.tasks
      }
      if (
        !dropResult.removedIndex &&
        !dropResult.addedIndex
      ) {
        entities = entities
      } else {
        let itemToAdd = dropResult.payload
        if (dropResult.removedIndex !== null) {
          itemToAdd = entities.splice(
            dropResult.removedIndex,
            1
          )[0]
        }
        if (dropResult.addedIndex !== null) {
          entities.splice(
            dropResult.addedIndex,
            0,
            itemToAdd
          )
        }
      }
      if (entityType === 'tasks') {
        const idx = context.state.board.groups.findIndex(
          (group) => group.id === groupId
        )
        context.commit({
          type: 'setTasksOrder',
          result: entities,
          idx,
        })
        boardService.saveTasksOrder(
          context.state.board._id,
          idx,
          entities
        )
      } else {
        board[entityType] = entities
        context.dispatch({ type: 'saveBoard', board })
        if (entityType === 'cmpsOrder') {
          context.commit({
            type: 'setCmpsOrder',
            newOrder: entities,
          })
        } else if (entityType === 'groups') {
          context.commit({
            type: 'setGroupsOrder',
            newOrder: entities,
          })
        }
      }
    },
  },
}
