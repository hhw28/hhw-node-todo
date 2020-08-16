const db = require('./db.js')
const inquirer = require('inquirer');

module.exports.add = async (title) => {
  //读取之前的任务
  const list = await db.read()
  //往里面添加一个任务
  list.push({title, done: false})
  //存储任务到文件
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}

module.exports.showAll = async () => {
  const list = await db.read()
  if (list.length === 0) {
    console.log('暂无任务')
    return
  }
  printTasks(list)
}

function printTasks(list) {
  inquirer
    .prompt(
      {
        type: 'list',
        name: 'index',
        message: '请选择你想操作到任务？',
        choices: [{name: '+ 创建任务', value: '-2'}, ...list.map((task, index) => ({
            name: `${task.done ? '[x]' : '[_]'}${index + 1} - ${task.title}`,
            value: index.toString()
          }
        )), {name: '退出', value: '-1'}],
      },
    )
    .then(async answer => {
      const index = parseInt(answer.index)
      if (index === -2) {
        askForCreateTask(list)
      } else if (index >= 0) {
        askForAction(list, index)
      }
    })
}

function askForCreateTask(list) {
  inquirer
    .prompt(
      {
        type: 'input',
        name: 'title',
        message: '请输入标题',
      },
    ).then(answer => {
    list.push({title: answer.title, done: false})
    db.write(list)
    console.log('创建成功')
  })
}

function markAsDone(list, index) {
  list[index].done = true
  db.write(list)
  console.log(`${list[index].title}已完成`)
}

function markAsUnDone(list, index) {
  list[index].done = false
  db.write(list)
  console.log(`${list[index].title}未完成`)
}

function updateTile(list, index) {
  inquirer
    .prompt(
      {
        type: 'input',
        name: 'title',
        message: '请输入标题',
      },
    ).then(answer => {
    list[index].title = answer.title
    db.write(list)
    console.log('标题已更新')
  })
}

function remove(list, index) {
  const title = list[index].title
  list.splice(index, 1)
  db.write(list)
  console.log(`${title}已删除`)
}


function askForAction(list, index) {
  const actions = {markAsDone, markAsUnDone, updateTile, remove,}
  inquirer
    .prompt(
      {
        type: 'list',
        name: 'action',
        message: '请选择操作？',
        choices: [
          {name: '已完成', value: 'markAsDone'},
          {name: '未完成', value: 'markAsUnDone'},
          {name: '改标题', value: 'updateTile'},
          {name: '删除', value: 'remove'},
          {name: '退出', value: 'quit'},
        ],
      },
    ).then(answer => {
    const action = actions[answer.action]
    action && action(list, index)
  })
}
