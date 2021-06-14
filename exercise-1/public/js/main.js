const fetchData = function(){
    return new Promise(function(resolve,reject){
        const url ='https://5dc588200bbd050014fb8ae1.mockapi.io/assessment';
        $.ajax({
            url:url,
            type:'GET',
            success (result){
                localStorage.setItem('Data',JSON.stringify(result))
               resolve(result);
            },
            error(err){
                reject(err)
            }
        })
    })
}

const GetHBS = function(){
   return new Promise(function(resolve, reject){
    $.ajax({
        type:'GET',
        url: '/views/table.hbs',
        success(result){
                resolve(result)
        },
        error(err){
            reject(err)
        }
    })
   })
}
const showData = function(){
    fetchData().then(result=>{
        console.log(result)
        GetHBS().then((template)=>{
            var template = Handlebars.compile(template)
            var context = {
                data : result
            }
            var el_html = template(context);
            $('#data').html(el_html);
        })
    }).catch((err)=>{
        alert(err)
    })
}

showData();

