import $ from "jquery";
import './csss/index.css'



$("#btn").click(function(){
    $.ajax({
        url:"/query",
        type: "POST",
        data: {name:1},          
    }).then(function(res){
        console.log(JSON.parse(res)  )
        // $("#msg").html(res)
    })
})