<template>
<div>
   <div class="title">
      <p>💻公共接口管理<span class="number">{{doneFinish}}/{{testArr.length}}</span></p>
   </div>
<!-- 侧边信息列表 -->
  <div class="card">
    <div class="tools">
      <div class="circle">
        <span class="red box"></span>
      </div>
      <div class="circle">
        <span class="yellow box"></span>
      </div>
      <div class="circle">
        <span class="green box"></span>
      </div>
    </div>
    <div class="card__content">
        <ul v-for="(ta,index) in testArr" :key="ta.id" style="list-style: none;">
          <li class="liStyle">
              {{index+1}}.{{ta.name}}
          </li>
        </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name:'apiMangerAside',
  //测试先写死
  props:['testArr'],
  data(){
    return {

    }
  },
  computed:{
    doneFinish(){
      return this.testArr.reduce((total,item)=> total+(item.done?1:0),0)
    }
  }
}
</script>

<style>
.title{
  width: 90%;
  height: 50px;
  margin: 5px auto;
  border-radius: 5px;
  background-color: #F8FBFE;
}
.title p{
  font-size: 16px;
  line-height: 48px;
}
.number{
float: right;
  margin-right: 20px;
}

.liStyle{
  width: 90%;
  height: 30px;
  margin: 5px auto;
  text-indent: 1rem;
  background-color: #F8FBFE;
}
.liStyle:hover{
  background-color:rgb(236,245,255);
  color: rgb(102,177,255);
}

.card {
  width: 90%;
  height: 400px;
  margin: 10px auto;
  background-color: #F8FBFE;
  border-radius: 8px;
  z-index: 1;
  overflow: scroll;
}

.tools {
  display: flex;
  align-items: center;
  padding: 9px;
}

.circle {
  padding: 0 4px;
}

.box {
  display: inline-block;
  align-items: center;
  width: 10px;
  height: 10px;
  padding: 1px;
  border-radius: 50%;
}

.red {
  background-color: #ff605c;
}

.yellow {
  background-color: #ffbd44;
}

.green {
  background-color: #00ca4e;
}



</style>