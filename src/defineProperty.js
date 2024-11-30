/* 
  Object.defineProperty(obj, )
  1、设置对象成员的规则
    - 如果成员存在，则修改其规则
    - 如果不存在，则新增成员，并设置规则
  

  对象成员的规则限制
  - configureable: 是否可删除
  - writable: 是否可更改
  - enumerable: 是否可枚举，是否可被遍历的属性for/in,或者Object.keys列举出来的属性是可枚举的
  - value: 成员的值
*/

let obj = {x: 100}

Object.defineProperty(obj, 'x', {value: 101, writable: false, enumerable: false, configurable: false})
Object.defineProperty(obj, 'y', {value: 101, writable: true, enumerable: true, configurable: true})

console.log(Object.getOwnPropertyDescriptor(obj, 'x'))
//{value: 100, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptors(obj))

Object.defineProperty(obj, 'y', {
  get(){
    return obj.value *2
  },
  set(val){
    console('sety',val)
  }
})
console.log(obj.y)
