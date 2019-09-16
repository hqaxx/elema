import express from 'express'
import MongoUtil from './libs/MongoUtil'
import setting from './libs/setting'
import bodyParser from 'body-parser'
const mongo=new MongoUtil(setting.host,setting.port,setting.dbName)
const server=express()
server.listen(1900)
server.use(bodyParser.urlencoded({extended:false}))

server.all('*',(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader('Access-Control-Allow-Hreders','content-type')
    res.setHeader('Acess-Control-Allow-Methods','DELETE,POST,GET,OPTIONS')
    if(req.method.toLowerCase()==='options'){
        res.send(200)
    }else{
        next()
    }
})
server.get('/header',(req,res)=>{
    mongo.find({},{},'seller',(err,result)=>{
        if(err)throw err
        res.send({errno:0,data:result[0]}).end()
    })
})
server.get('/good',(req,res)=>{
    mongo.find({},{},'goods',(err,result)=>{
        if(err)throw err
        res.send({errno:0,data:result}).end()
    })
})
server.get('/rating',(req,res)=>{
    mongo.find({},{},'rating',(err,result)=>{
        if(err)throw err
        res.send({errno:0,data:result}).end()
    })
})