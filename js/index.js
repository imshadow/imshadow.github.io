Date.prototype.Format = function (fmt) { // 
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
}


const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      }
    ],
    "name": "getBlog",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "content",
            "type": "string"
          }
        ],
        "internalType": "struct Blog.blog",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "datakey",
        "type": "string"
      }
    ],
    "name": "getData",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "date",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "content",
        "type": "string"
      }
    ],
    "name": "saveBlog",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "datakey",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "datavalue",
        "type": "string"
      }
    ],
    "name": "saveData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_titles",
        "type": "string"
      }
    ],
    "name": "saveTitles",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "titles",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const PRIVATE_KEY = '0x6957D225842C424B667E1D3CAA9DAE3F83CF726CA2EB37A2E3D73334C7AC9272'; // sender private key

const conflux = new window.Conflux.Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1,
});
const account = conflux.wallet.addPrivateKey(PRIVATE_KEY);

function getContract(){
  const contract = conflux.Contract({ abi, address: 'cfxtest:acctjwbk6615xd92b167626ws5957zpg92yhnjrkee' });
  return contract;
}

async function getTitles() {
  const contract = getContract();
  const titlesStr = await contract.titles();
  return titlesStr;
}

async function showTitles (){
  const titlesStr = await getTitles();
  const introUl = $("#intro").children("ul");
  const titles = titlesStr.split("||");
  $(introUl).html("");
  for(var i=0;i<titles.length;i++){
    $(introUl).append('<li onclick="showBlog(this)">'+titles[i]+'</li>');
  }
}

var isAdding = 0;

async function addBlog() {
  if(isAdding == 1){
    return;
  }
  const contract = getContract();
  const title = $("#title").val().trim();
  const content = $("#content").val().trim();
  if(!title || !content){
    return;
  }
  isAdding = 1;
  $("#addBlogTips").show();
  //先更新标题列表
  var titlesStr = await getTitles();
  var res = "";
  if(titlesStr.indexOf(title) == -1){
    titlesStr = titlesStr + "||" + title;
    res = await contract.saveTitles(titlesStr).sendTransaction({ from: account }).executed();
    console.log(res);
  }
  const nowTime = new Date().Format("yyyy-MM-dd hh:mm");
  res = await contract.saveBlog(title,nowTime,content).sendTransaction({ from: account }).executed();
  console.log(res);
  isAdding = 0;
  await showTitles();
  $("#title").val('');
  $("#content").val('');
  $("#addBlogTips").hide();
  alert('添加成功');
  window.location.href = '#intro';
}

async function showBlog(o) {
  const title = $(o).text();
  const contract = getContract();
  const postJson = await contract.getBlog(title);
  const post = $("#post");
  post.html('<h3 class="major">' + title + '</h3><h5>' + postJson['1'] + '</h5>');
  post.append(postJson['2']);
  window.location.href = '#post';
}

var isHandlingData = 0;

async function handleData(flag){
  if(isHandlingData == 1){
    return;
  }
  const contract = getContract();
  const datakey = $("#datakey").val().trim();
  const datavalue = $("#datavalue").val().trim();
  if(flag == 1){
    //添加
    if(!datakey || !datavalue){
      return;
    }
    isHandlingData = 1;
    $("#handleDataTips").show();
    const res = await contract.saveData(datakey,datavalue).sendTransaction({ from: account }).executed();
    console.log(res);
    $("#datakey").val('');
    $("#datavalue").val('');
    alert('添加成功');
  }else if(flag == 0){
    //查询
    if(!datakey){
      return;
    }
    isHandlingData = 1;
    $("#handleDataTips").show();
    const datavalueStr = await contract.getData(datakey);
    $("#datavalue").val(datavalueStr);
  }
  isHandlingData = 0;
  $("#handleDataTips").hide();
}


showTitles();