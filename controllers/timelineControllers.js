const items = require("../models/items")
const timelines = require("../models/timelines")

const getTimelines = async(req,res,next)=>{
try {
    let payloadData = req.query
    
    let criteria ={
        isDeleted : false,
        projectId : payloadData?.projectId
    } 
    let data = await timelines.find(criteria)
    return res.status(200).json(data)

} catch (error) {
    return  res.status(400).json({
        message : "Error",
        error : error
      })
}
} 
const getItems = async(req,res,next)=>{
    try {
        let payloadData = req.query
        let criteria = {
            isDeleted : false,
            timelineId : payloadData?.timelineId
        }
        let options ={
            sort : {_id :-1}
        }
        if(payloadData.search){
            criteria.$or = [
                {name: new RegExp('^' + payloadData.search, 'i')}
            ]
        }
        if(payloadData.skip)
        options.skip= payloadData.skip
        if(payloadData.limit)
        options.limit = payloadData.limit
        
        let data = await items.find(criteria,{},options).populate({
            modal : timelines,
            path : 'timelineId'
        })
        let count = items.find(criteria)
        return res.status(200).json({
            items : data,
            count : count.length
        })
        
    } catch (error) {
        return  res.status(400).json({
            message : "Error",
            error : error
          })
    }
}
const addEditTimeline=async(req,res,next)=>{
    try {
        let payloadData= req.body
        if(payloadData.id){
            let id = payloadData.id
            delete payloadData.id
         let data= await timelines.findByIdAndUpdate(id,payloadData)
         if(data)
         return res.status(200).json({
            "message":'Success'
         })
         else 
         return res.status(203).json({
            "message":"Something Went Wrong"
         })
        }
        let data = new timelines(payloadData)
        await data.save()
        return res.status(200).json(data)
        
    } catch (error) {
        return  res.status(400).json({
            message : "Error",
            error : error
          })
    }
}
const addEditItems = async(req,res,next)=>{
    try {
        let payloadData = req.body
        if(payloadData.id){
            let startDate=[]
            let endDate=[]
            let remarks =[]
         let item = await items.findById(payloadData.id)
          startDate = item.startDate
          endDate= item.endDate
           remarks = item.remarks
         
         if(payloadData.startDate){
            let date=payloadData.startDate
            delete payloadData.startDate
          startDate.push(date)
          startDate.sort(function(a, b){  return new Date(b) - new Date(a)})
          payloadData.startDate = startDate
         }
         if(payloadData.endDate){
            let date=payloadData.endDate
            delete payloadData.endDate
          endDate.push(date)
          endDate.sort(function(a, b){  return new Date(b) - new Date(a)})
          payloadData.endDate = endDate
         }
         if(payloadData.remarks){
            let remark=payloadData.remarks
            delete payloadData.remarks
            remarks.push(remark)
             payloadData.remarks = remarks
         }
        delete payloadData.id
         let data = await items.findByIdAndUpdate(item?._id,payloadData,{new:true})
         if(data)
         return res.status(200).json({
            "message":'Success'
         })
         else 
         return res.status(203).json({
            "message":"Something Went Wrong"
         })
        }
        let item = new items(payloadData)
        await item.save()
        return res.status(200).json(item)
        
    } catch (error) {
        return  res.status(400).json({
            message : "Error",
            error : error
          })
    }
}


module.exports = {
 getTimelines : getTimelines,
 getItems : getItems,
 addEditTimeline:addEditTimeline,
 addEditItems:addEditItems
  };