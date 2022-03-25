import { utilService } from './util-service.js'
import { storageService } from './async-storage-service.js'
import userService from './user-service.js'
export default {
  query,
  getById,
  saveTask,
  getEmptyTask,
  saveBoard,
  removeBoard,
  saveTasksOrder,
  getEmptyGroup,
  saveGroup,
}

const KEY = 'board_db'

localStorage[KEY] ? '' : _createDemoData()

//board

async function query(filterBy = null) {
  if (filterBy) {
    try {
      const boards = await storageService.query(KEY)
      const board = boards.find(
        (board) => board._id === filterBy.boardId
      )
      const filteredGroups = []
      if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        board.groups.forEach((group) => {
          const filterGroup = group.tasks.filter((task) =>
            regex.test(task.title)
          )
          filteredGroups.push(...filterGroup)
        })
      }

      return filteredGroups
    } catch (err) {
      console.log(
        'boardService: could not load boards with filter- ' +
        filterBy
      )
    }
  }
  return storageService.query(KEY)
}

function getById(id) {
  return storageService.getById(KEY, id)

}

function saveBoard(board) {
  if (board._id) return storageService.put(KEY, board)
  return storageService.post(KEY, board)
}

function removeBoard(boardId) {
  return storageService.remove(KEY, boardId)
}

// group

async function getGroupById(boardIdx, groupId) { }

function saveGroup(group, board) {
  if (!group.id) {
    group.id = utilService.makeId()
    board.groups.unshift(group)
  } else {
    const idx = board.groups.findIndex(bGroup => bGroup.id === group.id)
    board.groups.splice(idx, 1, group)
  }
  return saveBoard(board)
}

function getEmptyGroup() {
  return {
    // id: utilService.makeId(),
    title: 'New Group',
    style: {color: utilService.getRandomColor()},
    tasks: [],
  }
}

//task

async function saveTask(boardId, groupId, taskToSave) {
  const boards = await query()
  const board = boards.find(
    (board) => board._id === boardId
  )

  const idx = board.groups.findIndex(
    (group) => group.id === groupId
  )
  try {
    if (taskToSave.id) {
      const taskIdx = board.groups[idx].tasks.findIndex(
        (task) => task.id === taskToSave.id
      )
      board.groups[idx].tasks[taskIdx] = taskToSave
      await storageService.put(KEY, board)
    } else {
      taskToSave.createdAt = Date.now()
      taskToSave.id = utilService.makeId(8)
      taskToSave.byMember = userService.getLoggedinUser()
      board.groups[idx].tasks.push(taskToSave)

      await storageService.put(KEY, board)
      return taskToSave
    }
  } catch (err) {
    console.log('Boardservice: could not save task')
  }
}

async function saveTasksOrder(boardId, idx, tasksOrder) {
  const boards = await query()
  const board = boards.find(
    (board) => board._id === boardId
  )
  try {
    board.groups[idx].tasks = tasksOrder
    await storageService.put(KEY, board)
  } catch (err) {
    console.log('Boardservice: could not save tasksOrder')
  }
}

function removeTask(taskId) { }

function getEmptyTask() {
  return {
    title: '',
    createdAt: '',
    byMember: {},
    status: 's000',
    priority: 'p000',
    dueDate: '',
    timeline: {
      start: '',
      end: '',
    },
    tags: [],
    files: [],
    updates: [],
    members: [],
  }
}

function _createDemoData() {
  const boards = [
    {
      _id: 'b101',
      title: 'Sprint 4 - Monday GO!!!!',
      description: 'Final project E2E',
      createdAt: 1647966887053,
      isStarred: true,
      createdBy: {
        _id: 'u104',
        fullname: 'Someone',
        imgUrl:
          'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
      },
      cmpsOrder: [
        {
          cmpName: 'title-picker',
          preName: '',
        },
        {
          cmpName: 'member-picker',
          preName: 'People',
        },
        {
          cmpName: 'priority-picker',
          preName: 'Priority',
        },
        {
          cmpName: 'status-picker',
          preName: 'Status',
        },
        {
          cmpName: 'timeline-picker',
          preName: 'Timeline',
        },
        {
          cmpName: 'tag-picker',
          preName: 'Tags',
        },
        {
          cmpName: 'file-picker',
          preName: 'Files',
        },
      ],
      style: {
        view: 'table',
      },
      labels: {
        status: [
          {
            id: 's001',
            txt: 'Done',
            color: '#00c875',
          },
          {
            id: 's002',
            txt: 'Working on it',
            color: '#fdab3d',
          },
          {
            id: 's003',
            txt: 'Stuck',
            color: '#e2445c',
          },
          {
            id: 's000',
            txt: '',
            color: '#c4c4c4',
          },
        ],
        priority: [
          {
            id: 'p001',
            txt: 'High',
            color: '#e2445c',
          },
          {
            id: 'p002',
            txt: 'Medium',
            color: '#f9a0f0',
          },
          {
            id: 'p003',
            txt: 'Low',
            color: '#00c875',
          },
          {
            id: 'p000',
            txt: '',
            color: '#c4c4c4',
          },
        ],
      },
      members: [
        {
          _id: 'u101',
          fullname: 'Sapir Hiki',
          imgUrl:
            'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070371/a1avc0ofryx5enjnbklv.jpg',
        },
        {
          _id: 'u102',
          fullname: 'Lior Amar',
          imgUrl:
            'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070372/w1hcqybgmllnpl8ld2zh.jpg',
        },
        {
          _id: 'u103',
          fullname: 'Roee Furman',
          imgUrl:
            'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070370/qpolx3ucumsiscnf0ymk.jpg',
        },
        {
          _id: 'u104',
          fullname: 'Someone',
          imgUrl:
            'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
        },
      ],
      groups: [
        {
          id: 'g101',
          title: 'Preparing for demo 1',
          style: {
            color: '#33d391',
          },
          tasks: [
            {
              id: 't101',
              createdAt: 1590999730348,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Make it happen',
              status: 's001',
              priority: 'p001',
              dueDate: 16156215211,
              timeline: {
                start: 1647967976136,
                end: 1648928976136,
              },
              tags: [{ txt: 'first', color: '#e2445c' }],
              files: [],
              updates: [
                {
                  id: 'u104',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
            {
              id: 't102',
              createdAt: 1647967976136,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Deploying to heroku',
              status: 's001',
              priority: 'p003',
              dueDate: 1648928976136,
              timeline: {
                start: 1649797200000,
                end: 1647468000000,
              },
              tags: [{ txt: 'first', color: '#e2445c' }],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
                {
                  _id: 'u103',
                  fullname: 'Roee Furman',
                  imgUrl:
                    'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070370/qpolx3ucumsiscnf0ymk.jpg',
                },
              ],
            },
            {
              id: 't103',
              createdAt: 1647967976136,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Open git repository',
              status: 's001',
              priority: 'p002',
              dueDate: 1648928976136,
              timeline: {
                start: 1648414800000,
                end: 1647295200000,
              },
              tags: [],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u101',
                  fullname: 'Sapir Hiki',
                  imgUrl:
                    'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070371/a1avc0ofryx5enjnbklv.jpg',
                },
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
            {
              id: 't104',
              createdAt: 1647967976136,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Add board/user/auth/ services',
              status: 's000',
              priority: 'p003',
              dueDate: 1648928976136,
              timeline: {
                start: 1646258400000,
                end: 1646172000000,
              },
              tags: [],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u101',
                  fullname: 'Sapir Hiki',
                  imgUrl:
                    'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070371/a1avc0ofryx5enjnbklv.jpg',
                },
                {
                  _id: 'u103',
                  fullname: 'Roee Furman',
                  imgUrl:
                    'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070370/qpolx3ucumsiscnf0ymk.jpg',
                },
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
            {
              id: 't105',
              createdAt: 1647967976136,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Define what feature we support ',
              status: 's002',
              priority: 'p001',
              dueDate: 1648928976136,
              timeline: {
                start: 1647971548820,
                end: 1648929976136,
              },
              tags: [],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
                {
                  _id: 'u103',
                  fullname: 'Roee Furman',
                  imgUrl:
                    'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070370/qpolx3ucumsiscnf0ymk.jpg',
                },
              ],
            },
          ],
        },
        {
          id: 'g102',
          title: 'Frontend',
          style: {
            color: '#66ccff',
          },
          tasks: [
            {
              id: 't106',
              createdAt: 1648077401126,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Creating demo data',
              status: 's001',
              priority: 'p001',
              dueDate: 164807401126,
              timeline: {
                start: 1649106000000,
                end: 1648242000000,
              },
              tags: [{ txt: 'important', color: 'green' }],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
            {
              id: 't107',
              createdAt: 1647967976136,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Basic app architecture',
              status: 's001',
              priority: 'p003',
              dueDate: 1648928976136,
              timeline: {
                start: 1647969348820,
                end: 1648928976136,
              },
              tags: [{ txt: 'second', color: 'blue' }],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
                {
                  _id: 'u102',
                  fullname: 'Lior Amar',
                  imgUrl:
                    'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070372/w1hcqybgmllnpl8ld2zh.jpg',
                },
              ],
            },
            {
              id: 't108',
              createdAt: 1647967976136,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Create components files',
              status: 's002',
              priority: 'p000',
              dueDate: 1648928976136,
              timeline: {
                start: 1647969348820,
                end: 1648928976136,
              },
              tags: [{ txt: 'second', color: 'blue' }],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u102',
                  fullname: 'Lior Amar',
                  imgUrl:
                    'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070372/w1hcqybgmllnpl8ld2zh.jpg',
                },
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
            {
              id: 't109',
              createdAt: 1648077924927,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'CRUDL',
              status: 's001',
              priority: 'p001',
              dueDate: 1648077924927,
              timeline: {
                start: 1647969348820,
                end: 1648928976136,
              },
              tags: [{ txt: 'CRUDL', color: 'red' }],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
            {
              id: 't110',
              createdAt: 1648078924927,
              byMember: {
                _id: 'u101',
                fullname: 'Sapir Hiki',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Create folder structure for scss',
              status: 's002',
              priority: 'p003',
              dueDate: 1648077924927,
              timeline: {
                start: 1647969348820,
                end: 1648928976136,
              },
              tags: [{ txt: 'style', color: 'pink' }],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u102',
                  fullname: 'Lior Amar',
                  imgUrl:
                    'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070372/w1hcqybgmllnpl8ld2zh.jpg',
                },
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
          ],
        },
        {
          id: 'g103',
          title: 'Backend',
          style: {
            color: '#ffcb00',
          },
          tasks: [
            {
              id: 't111',
              createdAt: 1648077901326,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Set up basic storage service',
              status: 's001',
              priority: 'p002',
              dueDate: 164807401126,
              timeline: {
                start: 1640999730348,
                end: 16409922222,
              },
              tags: [{ txt: 'service', color: '#1acd83' }],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
            {
              id: 't112',
              createdAt: 1647967976136,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Backend folder structure',
              status: 's002',
              priority: 'p001',
              dueDate: 1648928976136,
              timeline: {
                start: 1647969348820,
                end: 1648928976136,
              },
              tags: [],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u101',
                  fullname: 'Sapir Hiki',
                  imgUrl:
                    'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070371/a1avc0ofryx5enjnbklv.jpg',
                },
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
            {
              id: 't113',
              createdAt: 1647967976136,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'APIs>Api routes, controller, service',
              status: 's000',
              priority: 'p002',
              dueDate: 1648928976136,
              timeline: {
                start: 1647969348820,
                end: 1648928976136,
              },
              tags: [{ txt: 'server', color: '#4eccc6' }],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
            {
              id: 't114',
              createdAt: 1648077924927,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Test all routes with Postman',
              status: 's003',
              priority: 'p002',
              dueDate: 1648077924927,
              timeline: {
                start: 1647969348820,
                end: 1648928976136,
              },
              tags: [{ txt: 'safety', color: '#401694' }],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
            {
              id: 't115',
              createdAt: 1648078924927,
              byMember: {
                _id: 'u104',
                fullname: 'Someone',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Set up MongoDB and Atlas',
              status: 's002',
              priority: 'p003',
              dueDate: 1648077924927,
              timeline: {
                start: 1647969348820,
                end: 1648928976136,
              },
              tags: [{ txt: 'fun', color: 'pink' }],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u104',
                    fullname: 'Someone',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              members: [
                {
                  _id: 'u104',
                  fullname: 'Someone',
                  imgUrl:
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
                {
                  _id: 'u101',
                  fullname: 'Sapir Hiki',
                  imgUrl:
                    'https://res.cloudinary.com/mistertoyyyyyyyy/image/upload/v1648070371/a1avc0ofryx5enjnbklv.jpg',
                },
              ],
            },
          ],
        },
      ],
      activities: [
        {
          id: 'a101',
          createdAt: 1647967977136,
          byMember: {
            _id: 'u104',
            fullname: 'Someone',
            imgUrl:
              'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
          description: {
            type: 'task',
            activity: 'Changed Color',
          },
        },
      ],
    },
  ]

  utilService.saveToStorage(KEY, boards)
}
