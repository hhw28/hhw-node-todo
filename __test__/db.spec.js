const db = require('../db')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
  const data = [{title: '任务1', done: false}]
  afterEach(() => {
    fs.clearMocks()
  })
  it('can read', async () => {
    fs.setReadFileMock('/xxx', null, JSON.stringify(data))
    const list = await db.read('/xxx')
    expect(list).toStrictEqual(data)
  })
  it('can write', async () => {
    let fakeFile
    fs.setWriteFileMock('/yyy', (path, data, callback) => {
      fakeFile = data
      callback(null)
    })
    await db.write(data, '/yyy')
    expect(fakeFile).toBe(JSON.stringify(data) + '\n')
  })
})
