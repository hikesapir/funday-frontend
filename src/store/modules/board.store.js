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
    boardMapByGroups: []
  },
  getters: {
    boards({ boards }) {
      return boards
    },
    board({ boardForDisplay }) {
      return JSON.parse(JSON.stringify(boardForDisplay))
    },
    cmpsOrder({ board }) {
      return board.cmpsOrder
    },
    boardData({ boardForDisplay }) {
      var statusMapCount = []
      var priorityMapCount = []
      if (!boardForDisplay?.groups) return
      const groups = JSON.parse(
        JSON.stringify(boardForDisplay.groups)
      )

      //Status calculation:
      const boardMapByGroups = []

      groups.forEach((group) => {
        const groupStatusCount = group.tasks.reduce(
          (acc, task) => {
            if (!task.status) return acc
            acc[task.status]
              ? (acc[task.status] += 1)
              : (acc[task.status] = 1)
            return acc
          },
          {}
        )
        statusMapCount.push(groupStatusCount)

        //Priority calculation:

        const groupPriCount = group.tasks.reduce(
          (acc, task) => {
            if (!task.priority) return acc
            acc[task.priority]
              ? (acc[task.priority] += 1)
              : (acc[task.priority] = 1)
            return acc
          },
          {}
        )
        priorityMapCount.push(groupPriCount)

        // Timeline calculation:

        const timelineMap = {
          start: [],
          end: [],
        }

        group.tasks.forEach((task) => {
          timelineMap.start.push(task.timeline.start)
          timelineMap.end.push(task.timeline.end)
        })

        const groupTimelineCalc = {
          start: Math.min(...timelineMap.start),
          end: Math.min(...timelineMap.end),
        }

        //Tags Summary:

        const groupTagsMap = []
        group.tasks.forEach((task) => {
          let taskTags = task.tags
          taskTags.forEach((taskTag) => {
            if (
              !groupTagsMap.length ||
              !groupTagsMap.some((tag) => {
                return tag.txt === taskTag.txt
              })
            )
              groupTagsMap.push(taskTag)
          })
        })

        //Members Summary:

        const groupMemberMap = []
        group.tasks.forEach((task) => {
          let taskMembers = task.members
          taskMembers.forEach((taskMember) => {
            if (
              !groupMemberMap.length ||
              !groupMemberMap.some((member) => {
                return member._id === taskMember._id
              })
            )
              groupMemberMap.push(taskMember)
          })
        })

        const groupSumMap = {
          _id: group.id,
          member: groupMemberMap,
          tags: groupTagsMap,
          timeline: groupTimelineCalc,
          priority: groupPriCount,
          groupStatusCount: groupStatusCount,
        }

        boardMapByGroups.push(groupSumMap)
      })
      statusMapCount = statusMapCount.reduce(
        (acc, statusMap) => {
          for (var status in statusMap) {
            const statusCount = statusMap[status]
            if (!acc[status]) acc[status] = statusCount
            else acc[status] += statusCount
          }
          return acc
        },
        {}
      )
      priorityMapCount = priorityMapCount.reduce(
        (acc, priMap) => {
          for (var pri in priMap) {
            const priCount = priMap[pri]
            if (!acc[pri]) acc[pri] = priCount
            else acc[pri] += priCount
          }
          return acc
        },
        {}
      )
      return {
        statusMapCount,
        priorityMapCount,
        boardMapByGroups,
      }
    },
  },
  mutations: {
    loadBoards(state, { boards }) {
      state.boards = JSON.parse(JSON.stringify(boards))
    },
    loadBoard(state, { board }) {
      state.board = board
      state.boardForDisplay = JSON.parse(
        JSON.stringify(board)
      )
    },
    onSetFilter(state, { filterBy }) {
      state.filterBy = JSON.parse(JSON.stringify(filterBy))
      const board = JSON.parse(JSON.stringify(state.board))
      const regex = new RegExp(filterBy.txt, 'i')
      var filteredGroups = board.groups.filter((group) => {
        if (regex.test(group.title) && !filterBy.member)
          return group
        var tasks = group.tasks.filter((task) =>
          regex.test(task.title)
        )
        tasks = tasks.filter((task) => {
          return task.members.some(
            (member) => member._id === filterBy.member
          )
        })
        group.tasks = tasks
        if (group.tasks.length > 0) return group
      })
      // filteredGroups = filteredGroups.filter(group)
      state.boardForDisplay.groups = JSON.parse(
        JSON.stringify(filteredGroups)
      )
    },
    toggleGroupDragMode(state) {
      state.isDraggingGroup = !state.isDraggingGroup
    },
    addTask(state, { groupIdx, savedTask }) {
      state.boardForDisplay.groups[groupIdx].tasks.push(
        savedTask
      )
    },
    updateTask(state, { groupId, updatedTask }) {
      const groupIdx =
        state.boardForDisplay.groups.findIndex(
          (group) => group.id === groupId
        )
      const group = state.boardForDisplay.groups[groupIdx]
      const taskIdx = group.tasks.findIndex(
        (task) => task.id === updatedTask.id
      )
      console.log(`Try to update task index ${taskIdx}`)
      if (taskIdx === -1) return
      state.boardForDisplay.groups[groupIdx].tasks[
        taskIdx
      ] = updatedTask
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
    addGroup(state, { group }) {

    }
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
      console.log('get it');
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
        await boardService.saveBoard(board)
        context.dispatch({ type: 'loadBoard', id: board._id })
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
          task.members = data.members
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
      const idx = state.boardForDisplay.groups.findIndex(
        (group) => group.id === groupId
      )
      if (idx !== -1) {
        savedTask = await boardService.saveTask(
          state.boardForDisplay._id,
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
        JSON.stringify(context.state.boardForDisplay)
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
      console.log(
        'dropResult',
        dropResult,
        entityType,
        groupId
      )
      if (entityType === 'tasks') {
        const idx =
          context.state.boardForDisplay.groups.findIndex(
            (group) => group.id === groupId
          )
        context.commit({
          type: 'setTasksOrder',
          result: entities,
          idx,
        })
        context.dispatch({ type: 'saveBoard', board })
      } else {
        board[entityType] = entities
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
        context.dispatch({ type: 'saveBoard', board })
      }
    },
    async saveGroup({ state, dispatch }, { group }) {
      try {
        const groupToSave = group || boardService.getEmptyGroup()
        const board = await boardService.saveGroup(groupToSave, JSON.parse(JSON.stringify(state.board)))
        dispatch({ type: 'loadBoard', id: board._id })
      } catch (err) {
        console.log('saveGroup err', err)
      }
    },
    async removeGroup({ state, dispatch }, { id }) {
      try {
        await boardService.removeGroup(id, JSON.parse(JSON.stringify(state.board)))
        // context.commit({ type: 'removeBoard', boardId })
        dispatch({ type: 'loadBoard', id: state.board._id })
      } catch (err) {
        console.log('removeGroup err', err)
      }
    },
  },
}
