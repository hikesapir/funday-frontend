// import authService from '../../services/auth.service.js'
import boardService from '../../services/board-service.js'
import router from '../../router'
import { utilService } from '../../services/util-service.js'
import userService from '../../services/user-service.js'
import { storeKey } from 'vuex'
import {
  socketService,
  SOCKET_EMIT_ADD_UPDATE,
  SOCKET_EMIT_EDIT_CMPS_ORDER,
  SOCKET_EMIT_TASK_UPDATED,
  SOCKET_EMIT_REMOVE_TASK,
  SOCKET_EMIT_TASK_ADD,
} from '../../services/socket-service.js'

export default {
  state: {
    isLoading: false,
    isTaskUpdatesOpen: false,
    boards: null,
    board: null,
    boardForDisplay: null,
    isDraggingGroup: false,
    filterBy: {
      txt: '',
    },
    sortBy: {
      type: '',
      dir: 1,
    },
    boardMapByGroups: [],
    isModalOpen: false,
    taskForDisplay: null,
  },
  getters: {
    boards({ boards }) {
      return boards
    },
    groupDragMode({ isDraggingGroup }) {
      return isDraggingGroup
    },
    board({ boardForDisplay }) {
      return boardForDisplay
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
          end: Math.max(...timelineMap.end),
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
          id: group.id,
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
    isModalOpen({ isModalOpen }) {
      return isModalOpen
    },
    isLoading({ isLoading }) {
      return isLoading
    },
    sortBy({ sortBy }) {
      return sortBy
    },
    taskForDisplay({ taskForDisplay }) {
      return taskForDisplay
    },
    isTaskUpdatesOpen({ isTaskUpdatesOpen }) {
      return isTaskUpdatesOpen
    },
  },
  mutations: {
    setTaskUpdates(state, { isOpen }) {
      state.isTaskUpdatesOpen = isOpen
    },
    setSortBy(state, { sortBy }) {
      // console.log(sortBy)
      // state.sortBy = JSON.parse(JSON.stringify(sortBy))
      const board = JSON.parse(
        JSON.stringify(state.boardForDisplay)
      )
      if (state.sortBy.type === sortBy) {
        state.sortBy.dir = state.sortBy.dir === 1 ? -1 : 1
      }
      switch (sortBy) {
        case 'status-picker':
          board.groups.forEach(
            (group, idx) =>
            (board.groups[idx].tasks = group.tasks.sort(
              (t1, t2) =>
                t1.status.localeCompare(t2.status) *
                state.sortBy.dir
            ))
          )
          break
        case 'priority-picker':
          board.groups.forEach((group) =>
            group.tasks.sort(
              (t1, t2) =>
                t1.priority.localeCompare(t2.priority) *
                state.sortBy.dir
            )
          )
          break
        case 'tag-picker':
          board.groups.forEach((group) =>
            group.tasks.sort((t1, t2) => {
              console.log(
                t1.tags[0].txt,
                't1',
                t2.tags[0].txt,
                't2'
              )
              if (!t1.tags[0].txt || !t2.tags[0].txt)
                return state.sortBy.dir

              return (
                t1.tags[0]?.txt.localeCompare(
                  t2.tags[0]?.txt
                ) * state.sortBy.dir
              )
            })
          )
          break
        case 'member-picker':
          board.groups.forEach((group) =>
            group.tasks.sort((t1, t2) => {
              if (
                !t1.members[0].fullname ||
                !t2.members[0].fullname
              )
                return state.sortBy.dir
              return (
                t1.members[0]?.fullname.localeCompare(
                  t2.members[0]?.fullname
                ) * state.sortBy.dir
              )
            })
          )
          break

        default:
          return
      }
      state.sortBy.type = sortBy
      state.boardForDisplay = board
    },
    loadBoards(state, { boards }) {
      state.boards = boards
    },
    loadBoard(state, { board }) {
      state.board = board
      state.boardForDisplay = JSON.parse(
        JSON.stringify(board)
      )
    },
    syncBoards(state, { filterBy }) {
      // console.log(filterBy)
      state.filterBy = JSON.parse(JSON.stringify(filterBy))
      const board = JSON.parse(JSON.stringify(state.board))
      const regex = new RegExp(filterBy.txt, 'i')
      var filteredGroups = board.groups.filter((group) => {
        if (regex.test(group.title) && !filterBy.member)
          return group
        var tasks = group.tasks.filter((task) =>
          regex.test(task.title)
        )
        if (filterBy.member) {
          tasks = tasks.filter((task) => {
            return task.members.some(
              (member) => member._id === filterBy.member
            )
          })
        }
        group.tasks = tasks
        if (group.tasks.length > 0) return group
      })
      // filteredGroups = filteredGroups.filter(group)
      state.boardForDisplay.groups = JSON.parse(
        JSON.stringify(filteredGroups)
      )
    },
    setOpenModal(state, { boolean }) {
      state.isModalOpen = boolean
    },
    toggleGroupDragMode(state, isDraggingGroup) {
      state.isDraggingGroup = isDraggingGroup
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
      if (taskIdx === -1) return
      // state.boardForDisplay.groups[groupIdx].tasks[
      state.board.groups[groupIdx].tasks[taskIdx] =
        updatedTask
    },
    saveBoard(state, { savedBoard }) {
      const idx = state.boards.findIndex(
        (board) => board._id === savedBoard._id
      )
      if (idx !== -1) {
        state.boards.splice(idx, 1, savedBoard)
        state.boardForDisplay = savedBoard
      } else state.boards.push(savedBoard)
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
    saveBoard(state, { board }) {
      const idx = state.boards.findIndex(
        (currBoard) => currBoard._id === board._id
      )
      state.boards.splice(idx, 1, board)
    },
    removeTask(state, { groupIdx, taskIdx }) {
      state.boardForDisplay.groups[groupIdx].tasks.splice(
        taskIdx,
        1
      )
    },
    addUpdate(state, { txt, taskId, boardId, groupId }) {
      console.log('hey')
      const { _id, fullname, imgUrl } =
        userService.getLoggedinUser()
      const update = {
        id: utilService.makeId(8),
        txt,
        createdAt: Date.now(),
        byMember: { _id, fullname, imgUrl },
      }
      state.taskForDisplay.updates.unshift(update)
    },
    setTaskFordisplay(state, { id, groupId, taskId }) {
      const group = state.board.groups.find(
        (currGroup) => currGroup.id === groupId
      )
      const task = group.tasks.find(
        (task) => task.id === taskId
      )
      state.taskForDisplay = task
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
        console.log('board', board)
        const savedBoard = await boardService.saveBoard(
          JSON.parse(JSON.stringify(board))
        )
        if (board._id) {
          context.commit({
            type: 'loadBoard',
            board: savedBoard,
          })
          // context.commit({
          //   type: 'saveBoard',
          //   board: savedBoard,
          // })
        } else {
          context.dispatch('loadBoards')
          router.push(`/boards/${savedBoard._id}`)
        }
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
      var backupTask = JSON.parse(JSON.stringify(task))
      task = JSON.parse(JSON.stringify(task))
      switch (cmpType) {
        case 'timeline-picker':
          task.timeline = data.timeline
          break
        case 'file-picker':
          task.files = data.files
          break
        case 'member-picker':
          task.members = data.members
          break
        case 'priority-picker':
          task.priority = data.val

          break
        case 'status-picker':
          task.status = data.val

          break
        case 'tag-picker':
          const tag = data.val
          task.tags.push({
            txt: tag,
            color: utilService.getRandomColor(),
          })

          break
        case 'title-picker':
          task.title = data.title

          break
      }
      const board = JSON.parse(JSON.stringify(state.board))
      try {
        commit({
          type: 'updateTask',
          groupId,
          updatedTask: task,
        })
        commit({
          type: 'syncBoards',
          filterBy: state.filterBy,
        })

        socketService.emit(SOCKET_EMIT_TASK_UPDATED, {
          groupId,
          task,
        })
        
        await boardService.saveTask(board, groupId, task)
      } catch (err) {
        console.log("Couldn't update task id- ", task.id)
        commit({
          type: 'updateTask',
          groupId,
          updatedTask: backupTask,
        })
      }
    },
    async saveTask({ commit, state }, { groupId, task }) {
      var savedTask = null
      const idx = state.boardForDisplay.groups.findIndex(
        (group) => group.id === groupId
      )
      const board = JSON.parse(JSON.stringify(state.board))
      try {
        if (idx !== -1) {
          savedTask = await boardService.saveTask(
            board,
            groupId,
            task
          )

          socketService.emit(SOCKET_EMIT_TASK_ADD, {
            groupIdx: idx,
            task: savedTask,
          })
          commit({
            type: 'addTask',
            groupIdx: idx,
            savedTask,
          })
        }
      } catch (err) {
        console.log('Couldnt save task')
      }
    },
    async removeTask(
      { commit, state },
      { groupId, taskId }
    ) {
      const board = JSON.parse(
        JSON.stringify(state.boardForDisplay)
      )
      const groupIdx = board.groups.findIndex(
        (group) => group.id === groupId
      )
      if (groupIdx === -1)
        return console.error(
          'boardStore: could not find group id -' + groupId
        )
      const taskIdx = board.groups[
        groupIdx
      ].tasks.findIndex((task) => task.id === taskId)
      if (taskIdx === -1)
        return console.error(
          'boardStore: could not find task id-' + taskId
        )
      try {
        await boardService.removeTask(
          board,
          groupIdx,
          taskIdx
        )
        socketService.emit(SOCKET_EMIT_REMOVE_TASK, {
          groupIdx,
          taskIdx,
        })
        commit({
          type: 'removeTask',
          groupIdx,
          taskIdx,
        })
      } catch (err) {
        console.log("Could'nt remove task")
      }
    },
    async changeOrder(
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
      if (entityType === 'tasks') {
        const idx = board.groups.findIndex(
          (group) => group.id === groupId
        )
        context.commit({
          type: 'setTasksOrder',
          result: entities,
          idx,
        })
        await boardService.saveTasksOrder(
          board,
          idx,
          entities
        )
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
        await boardService.saveBoard(board)
      }
    },
    async saveGroup({ state, commit }, { group }) {
      commit({ type: 'setIsLoading', isLoading: true })
      try {
        const groupToSave =
          group || boardService.getEmptyGroup()
        const board = await boardService.saveGroup(
          groupToSave,
          JSON.parse(JSON.stringify(state.board))
        )
        commit({ type: 'loadBoard', board })
      } catch (err) {
        console.log('saveGroup err', err)
      } finally {
        commit({ type: 'setIsLoading', isLoading: false })
      }
    },
    async removeGroup({ state, commit }, { id }) {
      commit({ type: 'setIsLoading', isLoading: true })
      try {
        const board = await boardService.removeGroup(
          id,
          JSON.parse(JSON.stringify(state.board))
        )
        commit({ type: 'loadBoard', board })
      } catch (err) {
        console.log('removeGroup err', err)
      } finally {
        commit({ type: 'setIsLoading', isLoading: false })
      }
    },
    async addItem({ state, commit }) {
      try {
        const task = boardService.getEmptyTask(
          'New Item',
          utilService.makeId()
        )
        const board = JSON.parse(
          JSON.stringify(state.board)
        )
        board.groups[0].tasks.unshift(task)
        const savedBoard = await boardService.saveBoard(
          board
        )
        commit({ type: 'loadBoard', board: savedBoard })
      } catch (err) {
        console.log('addItem err', err)
      }
    },
    async saveCmpTitle(
      { state, commit },
      { prevCmpTitle, newCmpTitle }
    ) {
      const board = JSON.parse(
        JSON.stringify(state.boardForDisplay)
      )
      const idx = board.cmpsOrder.findIndex(
        (cmp) => cmp.preName === prevCmpTitle
      )
      board.cmpsOrder[idx].preName = newCmpTitle
      try {
        await boardService.saveBoard(board)
        commit({
          type: 'setCmpsOrder',
          newOrder: board.cmpsOrder,
        })
        socketService.emit(
          SOCKET_EMIT_EDIT_CMPS_ORDER,
          board.cmpsOrder
        )
      } catch (err) { }
    },
    async addUpdate(
      { commit },
      { txt, taskId, boardId, groupId }
    ) {
      try {
        commit({
          type: 'addUpdate',
          txt,
          taskId,
          boardId,
          groupId,
        })
        await boardService.addUpdate(
          txt,
          taskId,
          boardId,
          groupId
        )
        socketService.emit(SOCKET_EMIT_ADD_UPDATE, {
          taskId,
          boardId,
          groupId,
          txt,
        })
      } catch (err) {
        console.log('addUpdate: Had problems')
      }
    },
  },
}
