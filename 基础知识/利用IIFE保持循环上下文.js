// 经典题目，下面这个操作的输出是什么？
for(var i = 0;i < 10;i++){
    setTimeout(function(){
        console.log(i);
    },i*1000);
}


// 修改之后的输出
for(var i = 0;i < 10;i++){
    (function(i){
        setTimeout(function(){
            console.log(i);
        },i*1000);
    })(i);
}

