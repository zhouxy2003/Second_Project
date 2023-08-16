<template>
  <div>
    <button @click="change('test')">接口管理</button>
    <button @click="change('main')">接口测试</button>
  </div>
</template>

<script>
export default {
  name: "NavigationBar", data() {
    return {activeName: 'first'};
  }, methods: {
    change(type) {
      console.log(type)
      if (type === 'test') {
        this.$emit('change-done', true)
      } else if (type === 'main') {
        this.$emit('change-done', false)
      }
    }
  }
}
</script>


<style>
button {
  width: 130px;
  height: 40px;
  font-size: 16px;
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  border: none;

}

button:nth-child(1) {
  border-right: 1px solid skyblue;
}

button:hover {
  color: white;
  background-color: rgb(64, 158, 255);
}

</style>