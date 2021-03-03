var app = document.querySelector('#app');
var tbody = document.getElementById('tbody');

var btn_bi_start = document.querySelector('#Btn_bi_start');
var btn_bi_reset = document.querySelector('#Btn_bi_reset');
var btn_bi_reboot = document.querySelector('#Btn_bi_reboot');
var btn_bi_rein = document.querySelector('#Btn_bi_rein');

var ip_localhost = 'http://localhost:81/api/ADB_Babdodug';

//把fetch整理成方法
const sendfetch = (method, url, data) => {
    return fetch(url, {
        method: method,
        headers: {
            //'Access-Control-Allow-Headers':'application/json',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function checkStatus(response) {
        //console.log("response status = " + response.status);
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            var error = new Error(response.statusText)
            error.response = response;
            throw error;
        }
    })

}

// 設定 勾選_選擇ip的全選/全取消按鈕
function allselected(){
    var num = document.querySelector('#devicenum').value;
    var allselected = document.querySelector('#allselected');

    if(allselected.checked){      //把所有裝置的進入系統checkbox全部勾選
        for(let i=1;i<=num;i++){
            document.querySelector('#bi_select'+i).checked = true;
            }
        allset_getip(num); 
    }else{
        for (let i = 1; i <= num; i++) { //把所有裝置的進入系統checkbox全部取消勾選
            document.querySelector('#bi_select'+i).checked = false;
            }
            allset_getip(num,1);
    }
}




//網頁載入時從webapi拿到裝置的名稱和ip並動態新增table到頁面上
window.addEventListener('load',()=>{
    var num = 0;
    //var ip_localhost = 'https://localhost:44308/api/ADB_Babdodug';
    //var ip_localhost = 'http://localhost:81/api/ADB_Babdodug';
    fetch(ip_localhost)
    .then((res)=>{
        return res.text();
    })
    .then((res)=>{
        var ippackage = [];
        ippackage = res.split(';');
        tbody.innerHTML +=`<table class="table">
        <thead>
          <tr>
            <th scope="col"><div>序號</div></th></div>  
           <th scope="col"><div>名稱</div></th></div>
           <th scope="col"><div>IP</div></th></div>
           <th scope="col"><div><div><input type="checkbox" name="g_type" id="allselected" onclick="allselected()"></div></div></th></div>
           
          </tr>
        </thead>
       
      </table>`;
        //  console.log(ippackage);
         ippackage.forEach(element => {
            num++;
    if(element){
                
         var data = [];
         data = element.split('=');
         tbody.innerHTML += ` <tr>
         <th scope="row"><div >${num}</div></th>
         
         <td><div>${data[0]}</div></td>
         <td><div id="allip${num}">${data[1]}</div></td>             
         <td>
           <div >
                <input type="checkbox" id="bi_select${num}" class="el_binary el_start"  onchange="AddSelectItem('bi_select${num}','hidd_allip','${data[1]}')" >                               
           </div>  
         </td>
       </tr>`;
             }
         });
         tbody.innerHTML +=`<input type='hidden' id='devicenum' value='${num-1}'/>`;
         
    });
    
});
//宣告一個檢查單/複選checkbox是否已被勾選的方法
function CheckBox_IsSelected(action, num) {
    let boolcheck = false;
    for (let i = 1; i <= num; i++) {
        if (document.querySelector('#' + action + i).checked) {
            boolcheck = true;
        }
    }
    return boolcheck;
}
//宣告checkbox的勾選事件 並把對應的動作和所在的位置寫進hidden input
function AddSelectItem(id,hidd_name,ip){
    var hidd_val = document.querySelector('#'+hidd_name);
    var checkbox = document.querySelector('#'+id);
    var devicenum = document.querySelector('#devicenum').value;
    var che_allcheck  = document.querySelector('#allselected');
    var ischeck = true;

    for(let i=1;i<=devicenum;i++){//判斷是否所以的ip都已經被勾選
        if(document.querySelector('#bi_select'+i).checked == false){
            ischeck = false;
            //console.log(ischeck);
        }
    }

    if(!ischeck){//如果全勾選 就把最上面的checkbox勾起來 否則就關掉checked屬性
        che_allcheck.checked = false;
    }else{
        che_allcheck.checked = true;
    }

    var temp='';
    if(checkbox.checked){//如果ip欄位被勾選 就加入hidd_allip這個hidden input
        if(!hidd_val.value){
            hidd_val.value+=ip;
        }else{
            hidd_val.value+=','+ip;
        }
    }else{
        hidd_val.value.split(',').forEach((item)=>{
            if(item===ip){
                item='';
            }else{
                if(!temp){
                    temp+=item;
                }else{
                    temp+=','+item;
                }
            }
           
        });
        hidd_val.value = temp;
    }
    
}
//檢查使用者是否有勾選ip的checkbox 如果有就去call api
function Check_CallAction(code){
    var num = document.querySelector('#devicenum').value;    
    let ans = CheckBox_IsSelected('bi_select', num)
    var hidd_allip = document.querySelector('#hidd_allip').value;
    if (!ans) {
        alert('請勾選至少一台裝置 再按下動作按鈕');
        return false;
    }
    if (!confirm('確定要執行此動作?')) {
        return false;
    }
    //confirm('準備發送動作');
    
    if(hidd_allip.indexOf(',')>-1){//判斷ip字串中的內容是單筆還是多筆
        Action(hidd_allip,code,1);
    }else{
        Action(hidd_allip,code,0);
    }
  
}
//設定進入app的按鈕
btn_bi_start.addEventListener('click', () => {
    Check_CallAction(3);
  
});
//設定重啟app的按鈕
btn_bi_reset.addEventListener('click',()=>{
    Check_CallAction(2);
});
//設定返回桌面的按鈕
btn_bi_reboot.addEventListener('click',()=>{
    Check_CallAction(1);
});
//設定平板重開機的按鈕
btn_bi_rein.addEventListener('click',()=>{
    Check_CallAction(4);
});

//宣告取得已勾選的ip的方法
function allset_getip(num,mode){
    var hidd_val = document.querySelector('#hidd_allip');
    if(!mode){//mode為空時 把勾選的ip的      
    for(let i=1;i<=num;i++){
       // console.log(num);
        if(!hidd_val.value){//hidd_val為空時只加入ip
            hidd_val.value += document.querySelector('#allip'+i).innerHTML;
        }else{//否 則hidd_val加入逗號和ip
            hidd_val.value += ','+ document.querySelector('#allip'+i).innerHTML;
        }
        
    }
    }else{//mode如果有數值,代表此時checkbox狀態是取消勾選 就清空hidd_allip的value
        hidd_val.value = '';
    }
    
}

function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => response.json()) // 輸出成 json
  }



//發送動作指令和裝置ip到webeapi
function Action(ip,code,ismultiple){
    
    const data = `ActionCode=${code};ip=${ip};ismultiple=${ismultiple}`;            
    //var ip_localhost = 'http://localhost:81/api/ADB_Babdodug';
    //'http://192.168.50.44/adb_webapi/api/GenerateBat';
    
    fetch(ip_localhost, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
            'content-type': 'application/json',
            'Access-Control-Allow-Origin':true
        })
      })
      .then((res)=>{
          return res.text()
      })
      .then((res)=>{
          console.log(res)
      })
      
};


