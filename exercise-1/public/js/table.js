var showExpandedData = function(id){
    if(localStorage.Data){
        const result = JSON.parse(localStorage.Data);
        console.log(result)
        if(result.length>0){
            result.map((Result)=>{
                if(Result.id===id){
                    $('#'+id).html(``)
                    $('#'+id).html(`Created at: ${new Date(Result.createdAt).toLocaleString()}    |  ID: ${Result.id}`)
                }
            })
        }
    }else{
        alert('Something went Wrong')

    }
}

$(document.body).on('click','.showData', function(){
    showExpandedData($(this).attr('id'))
})
