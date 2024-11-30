import React, { useEffect, useRef, useState } from 'react'
// import {flushSync} from 'react-dom'
import { Button, Tag, Table, Popconfirm, Modal, Form, Input, DatePicker, message } from 'antd'
import './index.less'
import { getTaskList, addTask, removeTask, completeTask} from  '../../api'
// import { useDispatch, useSelector } from 'react-redux'
// import { getTaskListAsync } from '../../store/features/taskSlice'
import { tagList } from '../../assets/constant'

const zeroPrefix = (text) => {
  text = String(text)
  return text.length < 2 ? '0' +text : text
}

const formatTime = (time) => {
  if (!time) return
  let arr = time.match(/\d+/g)
  let [year, month, day, hours, minutes] = arr
  return `${zeroPrefix(year)}-${zeroPrefix(month)}-${zeroPrefix(day)} ${zeroPrefix(hours)}: ${zeroPrefix(minutes)}`
}

export default function Task() {

  const [tableHead] = useState([
    {title: 'Id', dataIndex: 'id', align: 'center', width: '4%'},
    {title: 'Title', dataIndex: 'title', align: 'left', width: '20%'},
    {title: 'Description', dataIndex: 'description', align: 'left', width: '40%'},
    {title: 'PreCompleteTime', dataIndex: 'preCompleteTime', align: 'center', width: '10%',
      render: (_,record) => {
      let {preCompleteTime} = record
      return formatTime(preCompleteTime)
    }},
    {title: 'CompleteTime', dataIndex: 'completeTime', align: 'center', width: '10%', 
      render: (_,record) => {
      return formatTime(record.completeTime)
    }},
    {title: 'state', dataIndex: 'state', align: 'center', width: '6%', 
      render: (text, record) => {
      //text:某个单元格的数据
      //record:根据逻辑进行处理，本行的所有数据
      // console.log( record)
      return +text === 1 ? 'doing' : 'done'
    }},
    {title: 'Handle', align: 'center', width: '10%', 
      render: (_, record) => {
      let {id, state} = record
      return (
        <>
          <Popconfirm title='Confirm to delete this task?' onConfirm={() => {deleteTask(id)}}>
            <Button type='link' >Delete</Button>
          </Popconfirm>
          {
            +state !== 2 ?<Popconfirm title='Confirm to Complete this task?' onConfirm={() => {completeTaskAsync(id)}}>
              <Button type='link' >Complete</Button>
            </Popconfirm> : null
          }
        </>
      )
    }}
    
  ])

  const [taskList, setTaskList] = useState([])
  // let taskList = useSelector(state => state.task),
  //   dispatch = useDispatch()

  const [selectedTags, setSelectedTags] = React.useState(0)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [taskObj, setTaskObj] = useState({
    title: '',
    description: '',
    preCompleteTime: '',
    completeTime: '',
    state: 1
  })

  const formInstance = useRef()

  // React.useEffect(()=>{
	// 	let timer = setInterval(()=>{
	// 		setCount(count => count+1 )
	// 	},1000)
	// 	return ()=>{
	// 		clearInterval(timer)
	// 	}//return 一个回调函数，相当于componentWillUnmount
	// },[])

  useEffect((a) => {
    queryTaskList()

  }, [])//eslint-disable-line
  
  ////componentDidMount
  // useEffect(() => {
  //   console.log(taskList)
  //   (async () => {
  //     if(!taskList) {
  //       setLoading(true)
  //       await dispatch(getTaskListAsync(selectedTags))
  //       setLoading(false)
  //     }
  //   })()
  // }, [])//eslint-disable-line

  // useEffect(() => {
  //   dispatch(getTaskListAsync(selectedTags))
  //   // if(selectedTags)
  // },[selectedTags])//eslint-disable-line

  const handleChangeTag = (tag, checked) => {
    const nextSelectedTags = checked? tag.code : 0
    console.log('You are interested in: ', nextSelectedTags)
    setSelectedTags(nextSelectedTags);
    queryTaskList(nextSelectedTags)
  };

  const closeModel = () => {
    setModalVisible(false)
    setConfirmLoading(false)
    // console.log(formInstance)
    formInstance.current.resetFields()
  }

  const saveTask = async () => {
    //表单校验
    try{
      await formInstance.current.validateFields()
      // console.log('pass')
    }catch(error){
      return message.error('Please correct the input') 
    }
    setConfirmLoading(true)
    //处理setState异步问题
    // flushSync(()=>{
    //   setTaskObj(pre => ({
    //     ...pre, preCompleteTime: taskObj.preCompleteTime.format('YYYY-MM-DD HH:mm:ss')
    //   }))
    // })
    try{
      let {code} = await addTask(taskObj)
      if(+code !== 0){
        message.error('Save Error')
      }else{
        message.success('Success')
        closeModel()
        queryTaskList()
      }
    }catch(_){
      setConfirmLoading(false)
    }
    
    
  }

  const queryTaskList = async (state=0) => {
    setLoading(true)
    try{
      let {code, list} = await getTaskList(state)
      if(code !== 0) list = []
      setTaskList(list)
    }catch(_){
      message.error('Error')
    }
    setLoading(false)
  }

  const completeTaskAsync = async (id) => {
    try{
      let {code} = await completeTask(id)
      if(+code === 0){
        queryTaskList(selectedTags)
      }else{
        message.error('Completed Failed')
      }
    }catch(_) {}
  }

  const deleteTask = async (id) => {
    try{
      let {code} = await removeTask(id)
      if(+code === 0){
        queryTaskList(selectedTags)
      }else{
        message.error('Deleted Failed')
      }
    }catch(_) {}
  }

  return (
    <div className='task-box'>
      <div className="header">
        <h2 className="title">TASK MANAMENT SYSTEM</h2>
        <Button type='primary' onClick={() => {setModalVisible(true)}}>ADD TASK</Button>
      </div>
      <div className="tag-box">
        {/* <Tag color='#1677ff'>ALL</Tag>
        <Tag>DOING</Tag>
        <Tag>DONE</Tag> */}
        {tagList.map((tag) => (
          <Tag.CheckableTag
            key={tag.code}
            checked={selectedTags===tag.code}
            onChange={(checked) => handleChangeTag(tag, checked)}
          >
            {tag.value}
          </Tag.CheckableTag>))
        }
      </div>
      <Table  dataSource={taskList} columns={tableHead} loading={loading} pagination rowKey='id' />
      <Modal title='Add Task' open={modalVisible} confirmLoading={confirmLoading} keyboard={false}
        okText='Save' onCancel={closeModel} onOk={saveTask}>
          <Form ref={formInstance} layout='vertical' initialValues={{title: '', description: '', preCompleteTime: ''}}>
            <Form.Item label='Title' 
              name='title'
              validateTrigger='onBlur'
              rules={[{required: true, message: 'Please input your title !',}]}>
              <Input.TextArea
                maxLength={100} 
                value={taskObj.title} 
                onChange={event => setTaskObj(pre=>({...pre,title: event.target.value}))}
              />
            </Form.Item>
            <Form.Item label='Description' name='description'>
              <Input.TextArea rows={4} 
                maxLength={100} 
                value={taskObj.description} 
                onChange={event => setTaskObj(pre=>({...pre, description: event.target.value}))}/>
            </Form.Item>
            <Form.Item label='PreCompleteTime' 
              name='preCompleteTime'
              validateTrigger='onBlur'
              rules={[{required: true, message: 'Please input your preCompleteTime!',}]}>
                <DatePicker showTime 
                value={taskObj.preCompleteTime} 
                onChange={value => setTaskObj(pre => ({...pre,preCompleteTime: value.format('YYYY-MM-DD HH:mm:ss')}))} />
            </Form.Item>
          </Form>
      </Modal>
    </div>
  )
}
