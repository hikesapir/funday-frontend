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
      return JSON.parse(JSON.stringify(boards))
    },
    board({ boardForDisplay }) {
      return JSON.parse(JSON.stringify(boardForDisplay))
    },
    cmpsOrder({ board }) {
      return JSON.parse(JSON.stringify(board.cmpsOrder))
    }
  },
  mutations: {
    loadBoards(state, { boards }) {
      state.boards = JSON.parse(JSON.stringify(boards))
    },
    loadBoard(state, { board }) {
      state.board = JSON.parse(JSON.stringify(board))
      state.boardForDisplay = JSON.parse(JSON.stringify(board))
    },
    onSetFilter(state, { filterBy }) {
      state.filterBy = JSON.parse(JSON.stringify(filterBy))
      const board = JSON.parse(JSON.stringify(state.board))
      const regex = new RegExp(filterBy.txt, 'i')
      const filteredGroups = board.groups.filter(group => {
        if (regex.test(group.title)) return group
        const tasks = group.tasks.filter(task => regex.test(task.title))
        group.tasks = tasks
        if (group.tasks.length > 0) return group
      })
      state.boardForDisplay.groups = JSON.parse(JSON.stringify(filteredGroups))
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
    setIsLoading(state, { isLoading }) {
      state.isLoading = isLoading
    },
    setCmpsOrder(state, { newOrder }) {
      state.board.cmpsOrder = newOrder
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
      context.commit({ type: 'setIsLoading', isLoading: true })
      try {
        const board = await boardService.getById(id)
        context.commit({ type: 'loadBoard', board })
      } catch (err) {
        console.log('loadBoard err', err);
      } finally {
        context.commit({ type: 'setIsLoading', isLoading: false })
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
    changeOrderGroups(context, { dropResult, entities, entityType, element }) {
      // console.log(element, 'element store')
      var board = JSON.parse(
        JSON.stringify(context.state.board)
      )
      element === 'task' ? entities = entities.tasks : entities
      // console.log(entities, 'entities store')
      var movedItem = entities.splice(
        dropResult.removedIndex,
        1
      )[0]
      entities.splice(dropResult.addedIndex, 0, movedItem)

      if (element !== 'task') {
        board[entityType] = entities
        context.dispatch({ type: 'saveBoard', board })
      }

      if (element === 'task') {
        context.commit({ type: 'setTasksOrder', entities, idx })
        // await boardService.saveTasksOrder(
        //   state.board._id,
        //   idx,
        //   result
        // )
      }
      if (element === 'cmps') {
        // console.log('its cmps!@#')
        context.commit({
          type: 'setCmpsOrder',
          newOrder: entities,
        })
      }
      if (entityType === 'groups') {
        context.commit({
          type: 'setGroupsOrder',
          newOrder: entities,
        })
      }
      context.dispatch({
        type: 'loadBoard',
        id: context.state.board._id
      })
    },
  },
}
