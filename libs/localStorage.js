export default{
    read(key){
        let result=window.localStorage.getItem(key)
        if(!result){
            result=[]
        }
        return JSON.parse(result)
    },
    write(key,obj){
        let val=JSON.stringify(obj)
        window.localStorage.setItem(key,val)
    }
}