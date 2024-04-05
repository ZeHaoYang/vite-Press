---
outline: deep
---

# Vue 入门 API 示例

<span>使用 Create-vue 创建项目:</span>

**Node 16.0 版本以上**

```vue
npm init vue@latest
```

## 基本目录结构

```js{17}
├── public
│   ├── favicon.ico
├── src
│   ├── assets
│   ├── components
│   ├── router
│   ├── store
│   ├── views
│   ├── App.vue         - 根组件 SFC单文件组件 script-template- style
│   └── main.js         - 入口文件 createApp函数创建应用实例
├── index.html          - 单页入口 提供id为app的挂载点
├── README.md
├── tsconfig.json       - 项目的配置文件 基于vite的配置
├── vite.config.ts
└── package.json        -项目包文件 核心依赖项变成了 Vue3.x 和 vite

App.vue变化
    变化一:脚本script和模板template顺序调整
    变化二:模板template不再要求唯一根元素
    变化三:脚本script添加setup标识支持组合式API

```

## setup

<span>1.执行时机，比 beforeCreate 还要早</span><br />
<span> 2. setup 函数中，获取不到 this(this 是 undefined)</span><br />
<span> 3.数据 和 函数，需要在 setup 最后 return，才能模板中应用</span><br />

::: tip
setup 原始写法.
:::

```vue
<script>
export default {
  setup() {
    //console.log('setup函数'，this)
    //数据
    const message = "hello Vue3";
    //函数
    const logMessage = () => {
      console.log(message);
    };
    return {
      message,
      logMeage,
    };
  },
};
</script>

<template>
  <div>{{ message }}</div>
  <button @click="logMessage">按钮</button>
</template>
```

::: warning
setup 语法糖写法 【推荐】
:::

```vue
<script setup>
//数据
const message = "thisis message";
//函数
constlogMessage = console.log(message);
</script>

<template>
  <div>{{ message }}</div>
  <button @click="logMessage">按钮</button>
</template>
```

## 响应式数据 -核心

**ref()**
<span>接收简单类型 或 复杂类型，返回一个响应式的对象</span>

```vue
<script setup>
import { ref } from "vue";
const count = ref(0);
console.log(count.value);
const count2 = ref(简单类型或者复杂类型数据);
</script>
```

```TS
<script setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
//1有时我们可能想为 ref 内的值指定一个更复杂的类型，可以通过使用 Ref 这个类型：
const year: Ref<string | number> = ref('2020')

year.value = 2020 // 成功！

//2或者，在调用 ref() 时传入一个泛型参数，来覆盖默认的推导行为
// 得到的类型：Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // 成功！
</script>
```

<h5>使用介绍:</h5>
<span >
1.从 vue 包中导入 ref 函数  <br>
2.在&lt;script setup&gt中执行 ref 函数并传入初始值，使用变量接收 ref 函数的返回值
<hr>
<h6>本质</h6>
是在原有传入数据的基础上，外层包了一层对象，包成了复底层，包成复杂类型之后，再借助 reactive 实现的响应式注意点：<br>
1. 脚本中访问数据，需要通过.value  <br>
2. 在 template 中，.value 不需要加(帮我们扒了一层)<br>
3. ref 内部实现使用依赖于 reactive 函数

</span>

**reactive()**
<span>接受对象类型数据的参数传入并返回一个响应式的对象</span>

```vue
<script setup>
// reactive:接收一个对象类型的数据，返回一个响
import { reactive } from "vue";
const state = reactive({
  count: 100,
});
const setCount = () => {
  state.count++;
};
</script>
<template>
  <div>
    <div>{[ state.count ]]</div>
    <button @click="setCount">+1</button>
  </div>
</template>
```

<h5>使用介绍:</h5>
<span >
1从 vue 包中导入 reactive 函数 <br>
2.在&lt;script setup&gt中执行 reactive 函数并传入类型为对象的初始值，并使用变量接收返回值
</span>

## 计算属性 computed

**ref()**
<span>接收简单类型 或 复杂类型，返回一个响应式的对象</span>

```js
<script setup>
  // 导入
  import { computed } from 'vue'
  //执行函数 变量接收 在回调参数中return计算值
  const computedState = computed(() => freturn{
        return 基于响应式数据做计算之后的值
  }
</script>
```

<h5>核心步骤:</h5>
<span >
1导入computed函数   <br>
2.执行函数在回调参数中return基于响应式数据做计算的值，用变量接收 <br>
3.计算属性中不应该有,比如异步请求/修改dom <br>
4.避免直接修改计算属性的值,计算属性应该是只读的，特殊情况可以配置 get set
</span>

## 监听属性 Watch 函数

<span>侦听一个或者多个数据的变化，数据变化时执行回调函数 </span>

<h6>俩个额外参数:</h6> <br>
<span>
1.immediate (立即执行)
2.deep (深度侦听)
</span>

::: tip

<h6>基础用法-监听单个数据</h6>
导入watch函数
执行watch函数传入要侦听的响应式数据(ref对象)和回调函数
:::

```js
<script setup>
// 1.导入watch
	import { ref, watch ] from 'vue'
    const count = ref(0)
	//2，调用watch 听变化
	watch(count,(newValue, oldValue) => console.log(count发生了变化了
                               ,老值为${oldValue],新值为$[newValue}
</script>
```

::: tip

<h6>基础用法-监听多个数据</h6>
同时侦听多个响应式数据的变化，不管哪个数据变化都需要执行
:::

```js
<script setup>
	import { ref, watch ] from 'vue'
	const count = ref(0)
	const name = ref('cp')
	// 侦听多个数据源
	watch(
	  [count,name] .
	  ([newCount, newName], [oldCount, oldName]) => {
        console.log('count或者name变化了’，[newCount， newName]，[oldCount，oldName]
      }
   )
</script>
```

<h6>immediate <br>在侦听器创建时立即触发回调,响应式数据变化之后继续执行回调 </h6>

```js
<script setup>
	import { ref, watch ] from 'vue'
	const count = ref(0)
    watch(count ()=>{
        console.log count发生了变化')
    },{
        immediate:true
    }
immediate: true
</script>
```

<span > 
1深度监视可以监视复杂的对象类型数据 <br>
2对象中的任何属性变化了都会执行回调函数
</span>
**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
