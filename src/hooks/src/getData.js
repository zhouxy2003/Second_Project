export default  function getData(ve) {
  const xhr = new XMLHttpRequest();
  // 设置请求方法和URL
  xhr.open("GET", `http://127.0.0.1:3000/APIDATA`, true);

  // 监听XHR对象的load事件
  xhr.onload = () => {
    // 检查响应状态
    if (xhr.status === 200) {
      // 将响应数据解析为JSON格式
      const data = JSON.parse(xhr.responseText);

     // 使用 .$set 更新响应式数据
     ve.$set(ve, 'testArr', data);
    } else {
      console.error("Request failed. Status:", xhr.status);
    }
  };

  // 监听XHR对象的error事件
  xhr.onerror = () => {
    console.error("Request failed.");
  };

  // 发送请求
  xhr.send();
}