import { utilService } from './util-service.js'
import { storageService } from './async-storage-service.js'

export default {
  query,
  getById
}

const KEY = 'board_db'
_createDemoData()

var boards =
  utilService.loadFromStorage(KEY) || _createDemoData()

function getById(id) {
  return storageService.getById(KEY, id)
}

function query() {
  return storageService.query(KEY)
}

function _createDemoData() {
  boards = [
    {
      _id: 'b101',
      title: 'Sprint 4 - Monday GO!!!!',
      createdAt: 1647966887053,
      createdBy: {
        _id: 'u101',
        fullname: 'Sapir Hiki',
        imgUrl:
          'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
      },
      cmpsOrder: [
        'title-picker',
        'member-picker',
        'priority-picker',
        'status-picker',
        'timeline-picker',
        'tag-picker',
        'file-picker',
      ],
      style: {
        view: 'table',
      },
      labels: {
        status: [
          {
            id: 's001',
            txt: 'Done',
            color: '#33d391',
          },
          {
            id: 's002',
            txt: 'Working on it',
            color: '#fdbc64',
          },
          {
            id: 's003',
            txt: 'Stuck',
            color: '#e8697d',
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
            color: '#33d391',
          },
          {
            id: 'p002',
            txt: 'Medium',
            color: '#fdbc64',
          },
          {
            id: 'p003',
            txt: 'Low',
            color: '#e8697d',
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
                _id: 'u101',
                fullname: 'Sapir Hiki',
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
              tags: ['first'],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u101',
                    fullname: 'Sapir Hiki',
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
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
            {
              id: 't102',
              createdAt: 1647967976136,
              byMember: {
                _id: 'u101',
                fullname: 'Sapir Hiki',
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
                start: 1647969348820,
                end: 1648928976136,
              },
              tags: ['second'],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u101',
                    fullname: 'Sapir Hiki',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u101',
                    fullname: 'Sapir Hiki',
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
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
          ],
        },
        {
          id: 'g102',
          title: 'Frontend',
          style: {
            color: '#44d391',
          },
          tasks: [
            {
              id: 't101',
              createdAt: 1640999730348,
              byMember: {
                _id: 'u101',
                fullname: 'Sapir Hiki',
                imgUrl:
                  'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                color: '#26de81',
              },
              title: 'Creating demo data',
              status: 's001',
              priority: 'p001',
              dueDate: 1640999730348,
              timeline: {
                start: 1640999730348,
                end: 1640999730348,
              },
              tags: ['importent'],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u101',
                    fullname: 'Sapir Hiki',
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
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              ],
            },
            {
              id: 't102',
              createdAt: 1647967976136,
              byMember: {
                _id: 'u101',
                fullname: 'Sapir Hiki',
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
              tags: ['second'],
              files: [],
              updates: [
                {
                  id: 'u101',
                  txt: 'First update for this task',
                  createdAt: 1647968252227,
                  byMember: {
                    _id: 'u101',
                    fullname: 'Sapir Hiki',
                    imgUrl:
                      'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
                {
                  id: 'u101',
                  txt: 'Second update for this task',
                  createdAt: 1647969252227,
                  byMember: {
                    _id: 'u101',
                    fullname: 'Sapir Hiki',
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
                    'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
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
            _id: 'u101',
            fullname: 'Sapir Hiki',
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
