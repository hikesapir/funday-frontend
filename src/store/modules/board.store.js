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
  SOCKET_EMIT_EDIT_GROUPS_ORDER,
  SOCKET_EMIT_SAVE_BOARD,
} from '../../services/socket-service.js'

export default {
  state: {
    isLoading: false,
    isTaskUpdatesOpen: false,
    boards: null,
    board: null,
    isDraggingGroup: false,
    filterBy: {
      txt: '',
      member: '',
      priority: [],
      status: [],
    },
    sortBy: {
      type: '',
      dir: 1,
    },
    boardMapByGroups: [],
    isModalOpen: false,
    taskForDisplay: null,
    loggedInUser: null,
    kStatusOrder: [
      {
        status: { id: 's000', txt: '', color: '#c4c4c4' },
        tasks: [],
      },
      {
        status: {
          id: 's001',
          txt: 'Done',
          color: '#00c875',
        },
      },
      {
        status: {
          id: 's002',
          txt: 'Working on it',
          color: '#fdab3d',
        },
      },
      {
        status: {
          id: 's003',
          txt: 'Stuck',
          color: '#e2445c',
        },
      },
    ],
    boardByStatus: null,
  },
  getters: {
    boards({ boards }) {
      return boards
    },
    groupDragMode({ isDraggingGroup }) {
      return isDraggingGroup
    },
    board({ filterBy, board, sortBy }) {
      if (
        !filterBy.txt &&
        !filterBy.member &&
        !filterBy.priority.length &&
        !filterBy.status.length &&
        !sortBy.type
      )
        return board
      const boardForDisplay = JSON.parse(
        JSON.stringify(board)
      )
      //filter
      if (
        filterBy.txt ||
        filterBy.member ||
        filterBy.priority.length ||
        filterBy.status.length
      ) {
        const regex = new RegExp(filterBy.txt, 'i')
        var filteredGroups = boardForDisplay.groups.filter(
          (group) => {
            var tasks = group.tasks
            if (
              regex.test(group.title) &&
              !filterBy.member &&
              !filterBy.priority.length &&
              !filterBy.status.length
            )
              return group
            tasks = group.tasks.filter((task) =>
              regex.test(task.title)
            )

            if (filterBy.member) {
              tasks = tasks.filter((task) => {
                return task.members.some(
                  (member) => member._id === filterBy.member
                )
              })
            }

            if (filterBy.status.length > 0) {
              tasks = tasks.filter((task) =>
                filterBy.status.some(
                  (id) => id === task.status
                )
              )
            }

            if (filterBy.priority.length > 0) {
              tasks = tasks.filter((task) =>
                filterBy.priority.some(
                  (id) => id === task.priority
                )
              )
            }

            group.tasks = tasks
            if (group.tasks.length > 0) return group
          }
        )

        boardForDisplay.groups = JSON.parse(
          JSON.stringify(filteredGroups)
        )
      }
      //sort
      if (sortBy.type) {
        switch (sortBy.type) {
          case 'status-picker':
            boardForDisplay.groups.forEach(
              (group, idx) =>
                (boardForDisplay.groups[idx].tasks =
                  group.tasks.sort(
                    (t1, t2) =>
                      t1.status.localeCompare(t2.status) *
                      sortBy.dir
                  ))
            )
            break
          case 'priority-picker':
            boardForDisplay.groups.forEach((group) =>
              group.tasks.sort(
                (t1, t2) =>
                  t1.priority.localeCompare(t2.priority) *
                  sortBy.dir
              )
            )
            break
          case 'tag-picker':
            boardForDisplay.groups.forEach((group) =>
              group.tasks.sort((t1, t2) => {
                if (!t1.tags[0]?.txt || !t2.tags[0]?.txt)
                  return sortBy.dir

                return (
                  t1.tags[0]?.txt.localeCompare(
                    t2.tags[0]?.txt
                  ) * sortBy.dir
                )
              })
            )
            break
          case 'member-picker':
            boardForDisplay.groups.forEach((group) =>
              group.tasks.sort((t1, t2) => {
                if (
                  !t1.members[0]?.fullname ||
                  !t2.members[0]?.fullname
                )
                  return sortBy.dir
                return (
                  t1.members[0]?.fullname.localeCompare(
                    t2.members[0]?.fullname
                  ) * sortBy.dir
                )
              })
            )
            break

          default:
            return
        }
      }
      return boardForDisplay
    },
    boardByStatus(state) {
      if (state.boardByStatus) return state.boardByStatus
      const board = JSON.parse(JSON.stringify(state.board))
      const initBoardByStatus = JSON.parse(
        JSON.stringify(state.kStatusOrder)
      )
      board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          task.groupId = group.id
          const idx = initBoardByStatus.findIndex(
            (s) => s.status.id === task.status
          )
          if (!initBoardByStatus[idx].tasks)
            initBoardByStatus[idx].tasks = []
          initBoardByStatus[idx].tasks.push(task)
        })
      })
      return initBoardByStatus
    },
    kStatusOrder({ kStatusOrder }) {
      return kStatusOrder
    },
    cmpsOrder({ board }) {
      return board.cmpsOrder
    },
    boardData({ board }) {
      var statusMapCount = []
      var priorityMapCount = []
      if (!board?.groups) return
      const groups = JSON.parse(
        JSON.stringify(board.groups)
      )

      //Status calculation:
      const boardMapByGroups = []
      const members = board.members
      const tasksForMemberMap = {}

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

        //Numbers Summary:

        const groupNumbersMap = []
        group.tasks.forEach((task) => {
          if (!task.number) return groupNumbersMap
          return groupNumbersMap.push(task.number)
        })

        // })

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

        //tasksForMember
        group.tasks.forEach((task) => {
          let taskMembers = task.members
          taskMembers.forEach((taskMember) => {
            if (!tasksForMemberMap[taskMember.fullname]) {
              tasksForMemberMap[taskMember.fullname] = 0
            }
            tasksForMemberMap[taskMember.fullname]++
          })
        })

        const groupSumMap = {
          id: group.id,
          member: groupMemberMap,
          tags: groupTagsMap,
          timeline: groupTimelineCalc,
          priority: groupPriCount,
          groupStatusCount: groupStatusCount,
          numbers: groupNumbersMap,
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

      members.forEach((member) => {
        if (!tasksForMemberMap[member.fullname]) {
          tasksForMemberMap[member.fullname] = 0
        }
      })

      return {
        statusMapCount,
        priorityMapCount,
        boardMapByGroups,
        tasksForMemberMap,
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
    setKTasksOrder(state, { result, idx }) {
      state.boardByStatus[idx].tasks = result
    },
    buildBoardByStatus(state) {
      const boardByStatus = JSON.parse(
        JSON.stringify(state.kStatusOrder)
      )
      state.board.groups.forEach((group) => {
        group.tasks.forEach((task, index) => {
          task.groupId = group.id
          const idx = boardByStatus.findIndex(
            (s) => s.status.id === task.status
          )
          if (!boardByStatus[idx].tasks)
            boardByStatus[idx].tasks = []
          boardByStatus[idx].tasks.push(task)
        })
      })
      state.boardByStatus = boardByStatus
    },
    setTaskUpdates(state, { isOpen }) {
      state.isTaskUpdatesOpen = isOpen
    },
    setSortBy(state, { sortBy }) {
      if (state.sortBy.type === sortBy) {
        state.sortBy.dir = state.sortBy.dir === 1 ? -1 : 1
      }
      state.sortBy.type = sortBy
    },
    loadBoards(state, { boards }) {
      state.boards = boards
    },
    setFilter(state, { filterBy }) {
      state.filterBy = JSON.parse(JSON.stringify(filterBy))
    },
    loadBoard(state, { board }) {
      state.board = board
    },
    setOpenModal(state, { boolean }) {
      state.isModalOpen = boolean
    },
    toggleGroupDragMode(state, isDraggingGroup) {
      state.isDraggingGroup = isDraggingGroup
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
      if (taskIdx === -1) return
      state.board.groups[groupIdx].tasks[taskIdx] =
        updatedTask
      this.commit('buildBoardByStatus')
    },
    saveBoard(state, { savedBoard }) {
      const idx = state.boards.findIndex(
        (board) => board._id === savedBoard._id
      )
      if (idx !== -1) {
        state.boards.splice(idx, 1, savedBoard)
        state.board = savedBoard
      } else state.boards.push(savedBoard)
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
      // console.log(newOrder)
      state.board.cmpsOrder = newOrder
    },
    saveBoard(state, { board }) {
      const idx = state.boards.findIndex(
        (currBoard) => currBoard._id === board._id
      )
      state.boards.splice(idx, 1, board)
    },
    removeTask(state, { groupIdx, taskIdx }) {
      state.board.groups[groupIdx].tasks.splice(taskIdx, 1)
    },
    addUpdate(state, { update, taskId, boardId, groupId }) {
      const { _id, fullname, imgUrl } = update.from
      const updateMsg = {
        id: utilService.makeId(8),
        txt: update.txt,
        createdAt: Date.now(),
        byMember: { _id, fullname, imgUrl },
      }
      console.log(updateMsg)
      state.taskForDisplay.updates.unshift(updateMsg)
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
    setUser(state, user) {
      state.loggedInUser = user
    },
    addActivity(state, { activity }) {
      state.board.activities.push(activity)
    },
    setStatusOrder(state, { newOrder }) {
      state.boardByStatus = newOrder
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
          JSON.parse(JSON.stringify(board))
        )
        if (board._id) {
          context.commit({
            type: 'loadBoard',
            board: savedBoard,
          })
          socketService.emit(
            SOCKET_EMIT_SAVE_BOARD,
            savedBoard
          )
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
      console.log('data', data)
      const board = JSON.parse(JSON.stringify(state.board))
      const { cmpType, groupId } = data
      var { task } = data
      var backupTask = JSON.parse(JSON.stringify(task))
      task = JSON.parse(JSON.stringify(task))
      const type = cmpType.split('-')[0]
      const description = {
        type: 'task',
        title: task.title,
        action: `Added/Changed ${type}`,
      }
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
          if (data.val.txt) {
            task.tags.push({
              txt: data.val.txt,
              color: utilService.getRandomColor(),
            })
          } else {
            task.tags = data.val
          }
          break
        case 'title-picker':
          task.title = data.title
          break
        case 'number-picker':
          task.number = data.number
          break
      }

      commit({
        type: 'updateTask',
        groupId,
        updatedTask: task,
      })
      try {
        // saving the tasks inside the board object
        // const savedBoard = await boardService.saveTask(
        //   board,
        //   groupId,
        //   task
        // )

        // save the board in the database, and add activity
        const activity = await boardService.recordChange(
          board,
          groupId,
          description,
          task
        )
        commit({ type: 'addActivity', activity })
        socketService.emit(SOCKET_EMIT_TASK_UPDATED, {
          groupId,
          task,
        })
      } catch (err) {
        console.log("Couldn't update task id- ", task.id)
        commit({
          type: 'updateTask',
          groupId,
          updatedTask: backupTask,
        })
        // throw err
      }
    },
    async saveTask({ commit, state }, { groupId, task }) {
      var savedTask = null
      const idx = state.board.groups.findIndex(
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
      const board = JSON.parse(JSON.stringify(state.board))
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
        JSON.stringify(context.state.board)
      )
      entities = JSON.parse(JSON.stringify(entities))
      var entityId = ''
      var boardByStatus = null
      if (entityType === 'tasks') {
        entityId = entities.groupId
        entities = entities.tasks
      } else if (entityType === 'k-tasks') {
        entityId = entities.status.id
        entities = entities.tasks

        if (!context.state.boardByStatus)
          context.commit('buildBoardByStatus')
        boardByStatus = JSON.parse(
          JSON.stringify(context.state.boardByStatus)
        )
      }
      if (
        !dropResult.removedIndex &&
        !dropResult.addedIndex
      ) {
        entities = entities
      } else {
        let itemToAdd = dropResult.payload
        if (entityType === 'k-tasks')
          itemToAdd.status = entityId
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
          (group) => group.id === entityId
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
      } else if (entityType === 'k-status') {
        context.commit({
          type: 'setStatusOrder',
          newOrder: entities,
        })
      } else if (entityType === 'k-tasks') {
        const idx = boardByStatus.findIndex(
          (list) => list.status.id === entityId
        )
        context.commit({
          type: 'setKTasksOrder',
          result: entities,
          idx,
        })
      } else {
        board[entityType] = entities
        if (entityType === 'cmpsOrder') {
          context.commit({
            type: 'setCmpsOrder',
            newOrder: entities,
          })
          socketService.emit(
            SOCKET_EMIT_EDIT_CMPS_ORDER,
            entities
          )
        } else if (entityType === 'groups') {
          context.commit({
            type: 'setGroupsOrder',
            newOrder: entities,
          })
          socketService.emit(
            SOCKET_EMIT_EDIT_GROUPS_ORDER,
            entities
          )
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
        socketService.emit(SOCKET_EMIT_SAVE_BOARD, board)
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
        socketService.emit(SOCKET_EMIT_SAVE_BOARD, board)
      } catch (err) {
        console.log('removeGroup err', err)
      } finally {
        commit({ type: 'setIsLoading', isLoading: false })
      }
    },
    async addTaskToTheStart({ state, commit }) {
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
        socketService.emit(
          SOCKET_EMIT_SAVE_BOARD,
          savedBoard
        )
      } catch (err) {
        console.log('addTaskToTheStart err', err)
      }
    },
    async saveCmpTitle(
      { state, commit },
      { prevCmpTitle, newCmpTitle }
    ) {
      const board = JSON.parse(JSON.stringify(state.board))
      const idx = board.cmpsOrder.findIndex(
        (cmp) => cmp.preName === prevCmpTitle
      )
      board.cmpsOrder[idx].preName = newCmpTitle
      try {
        await boardService.saveBoard(board)
        // console.log(board.cmpsOrder);
        commit({
          type: 'setCmpsOrder',
          newOrder: board.cmpsOrder,
        })
        socketService.emit(
          SOCKET_EMIT_EDIT_CMPS_ORDER,
          board.cmpsOrder
        )
      } catch (err) {
        console.log('saveCmpTitle', err)
      }
    },
    async addUpdate(
      { commit },
      { update, taskId, boardId, groupId }
    ) {
      try {
        commit({
          type: 'addUpdate',
          update,
          taskId,
          boardId,
          groupId,
        })
        await boardService.addUpdate(
          update,
          taskId,
          boardId,
          groupId
        )
        socketService.emit(SOCKET_EMIT_ADD_UPDATE, {
          taskId,
          boardId,
          groupId,
          update,
        })
      } catch (err) {
        console.log('addUpdate: Had problems')
      }
    },
    async setUser({ commit }) {
      try {
        const user = userService.getLoggedinUser()
        commit({ type: 'setUser', user })
      } catch (err) {
        // throw ('Cannot find logged in user', err)
      }
    },
    changeGroupColor(
      { state, dispatch },
      { groupId, color }
    ) {
      const board = JSON.parse(JSON.stringify(state.board))
      const idx = board.groups.findIndex(
        (group) => group.id === groupId
      )
      board.groups[idx].style.color = color
      dispatch({ type: 'saveBoard', board })
    },
  },
}
