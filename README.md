# TODO

1、安装
```
npm i hhw-node-todo 
```

2、使用
1. 查看任务 `t`
2. 新增任务 `t add 任务1`
3. 清除所有任务 `t clear`

## 实现
#### 1、创建node.js命令行项目

#### 2、[commander](https://github.com/tj/commander.js)
一个轻巧的nodejs模块，提供了用户命令行输入和参数解析强大功能

#### 3、实现创建功能

1. 读取之前的文件`fs.readFile(path, options, callback)`
2. 往里面添加一个任务
3. 存储任务到文件`fs.writeFile(file, data, options, callback)`

#### 4、其他功能

1. 清除
2. 展示全部 - 交互式命令行工具 [inquirer](https://github.com/SBoudrias/Inquirer.js)

#### 5、发布准备

1. package.json
```
{
  "bin": {
    "t": "cli.js"  //命令行入口文件，作用是让其他人安装该 package 之后，可以通过 t 命令来运行 cli.js
  },
  "main": "index.js",
  "files":[
    "*.js"  //需要上传到npm的文件
  ]
}
```
2. cli.js 添加 node shebang
```
#!/usr/bin/env node
```
3. cli.js 需要变为可执行文件
```
chmod +x cli.js  //mac、linux 必须执行
```
4. nrm 插件
```
nrm ls //查看npm源当前使用的是哪个
nrm use npm //切换npm源为npm，发布必须为npm源
```

#### 6、发布

1. 登陆 `npm adduser`
2. 发布 `npm publish`

#### 7、版本更新

1. cli.js添加版本号
```
program
  .version(pkg.version)
```
2. package.js版本号更新之后 `npm publish`

# 测试
# 调试
