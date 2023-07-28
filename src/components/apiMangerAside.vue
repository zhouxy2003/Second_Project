<template>
<div>
    <p class="listTitle">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
      </svg>
      接口信息列表/{{apiData.length}}
    </p>
    <div class="list">
        <ul v-for=" ad in apiData" :key="ad.id">
          <li class="li">
            <h4> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>接口——{{ad.name}}</h4>
          </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
  name:"apiMangerAside",
  data(){
    return{
      apiData:[
        {id:1,name:"天气"},
        {id:2,name:"交通"},
        {id:3,name:"教育"}
      ]
    }
  }
}
</script>

<style>
.listTitle{
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-indent: 0.5rem;

  background-color: rgb(213,235,252);
  border-radius: 10px;
  box-shadow:  23px 23px 34px #cecece,
  -23px -23px 34px #f2f2f2;
}
.list{
  width: 100%;
  height: 750px;
  border-top: 3px solid deepskyblue;
  overflow: hidden;
}
.li{
  width: 100%;
  height: 40px;
  margin-top: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
  box-shadow:  2px 2px 3px #cecece,
  -3px -3px 3px #f2f2f2;
  text-indent: 0.5rem;
}


</style>