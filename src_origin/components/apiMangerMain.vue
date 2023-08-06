<template>
<div>
  <div class="top">
      <p>
        <span class="firstSp">🆔ID</span>
        <span class="Sp">👨‍💻Name</span>
        <span class="Sp">⌨️API</span>
        <span class="Sp">❗Done</span>
        <span class="Sp">🕹️Method</span>
        <button>增加接口</button>
      </p>
  </div>
  <div class="DataList">
      <ul v-for="(ta) in testArr" :key="ta.id" style="margin-top: 20px">
        <li class="dataLi">
            <span class="firstSp_dataLi">{{ta.id}}</span>
            <span  class="Sp_dataLi span_name">{{ta.name}}</span>
            <span  class="Sp_dataLi span_api">{{ta.api}}</span>
            <span  class="Sp_dataLi span_done">{{ta.done===true?'🟢':'🔴'}}{{ta.done}}</span>
            <span  class="Sp_dataLi span_method">{{ta.method}}</span>
        </li>
      </ul>
  </div>
</div>
</template>

<script>
export default {
  name:'apiMangerMain',
  props:['testArr'],
  data(){
    return {

    }
  },
}
</script>

<style>
.top{
  width: 100%;
  height: 60px;

  border-radius: 5px;
  background-color: #F8FBFE;
}
.firstSp{
  float: left;
  margin-left: 2%;
  line-height: 60px;
}
.Sp{
  float: left;
  margin-left: 15%;
  line-height: 60px;
}
.top button{
  width: 80px;
  height: 40px;
  margin-top: 10px;
  border: none;
  color: white;
  border-radius: 5px;
  background-color: rgb(64,158,255);
}
.top button:hover{
  background-color: rgb(102,177,255);
}

.DataList{
  width: 100%;
  height: 700px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #F8FBFE;
  overflow: scroll;
}
.dataLi{
  width: 100%;
  height: 50px;
}

.firstSp_dataLi{
  float: left;
  margin-left: 3%;
  line-height: 60px;
}
.Sp_dataLi{
  color: rgb(97,107,129);
  float: left;
  line-height: 60px;
}
.span_name{
  color: rgb(102,177,255);
  margin-left: 16%;
}
.span_api{
  color: rgb(97,107,129);
  margin-left: 12%;
}
.span_done{
  color: rgb(97,107,129);
  margin-left: 14%;
}
.span_method{
  color: rgb(87,168,84);
  margin-left: 18%;
}


</style>