const client = require("../models/client")
const mom = require("../models/mom")
const projects = require("../models/projects")

const addEditMOM = async (req, res, next) => {
    try {
        let payloadData = req.body
        if (payloadData.id) {
            let id = payloadData.id
            delete payloadData.id
            let data = await mom.findByIdAndUpdate(id, payloadData, {
                new: true
            })
            if (data)
                return res.status(200).json(data)
        } else {
            let data = new mom(payloadData)
            await data.save()
            return res.status(200).json(data)
        }

    } catch (error) {
        return res.status(400).json({
            message: "Error",
            error: error
        })
    }
}
const getMOM = async (req, res, next) => {
    try {
        let payloadData = req.query
        let startDate = `2022-02-02T00:00:00.000Z`
        let endDate = new Date()
        let criteria = {
            isDeleted: false
        }
        if (payloadData.id)
            criteria._id = payloadData.id

        if (payloadData.search) {
                criteria.$or = [
                    {title: new RegExp('^' + payloadData.search, 'i')},
                    {category: new RegExp('^' + payloadData.search, 'i')}
                ]
            } 

        if (payloadData.userId)
            criteria.userId = payloadData.userId

        if (payloadData.clientId)
            criteria.sharedWith = payloadData.clientId

        if (payloadData.projectId)
            criteria.projectId = payloadData.projectId

        if (payloadData.category)
            criteria.category = payloadData.category

        if(payloadData.isShared==true)
            criteria.isShared = true
        
        if(payloadData.isShared==false)
            criteria.isShared = false
        
        if (payloadData.startDate)
            startDate = `${payloadData.startDate}T00:00:00.000Z`

        if (payloadData.endDate)
            endDate = `${payloadData.endDate}T00:00:00.000Z`
        criteria.createdAt = {
                $gt: startDate,
                $lte: endDate
            }

        let options = {
            sort: {
                _id: -1
            }
        }
        if (payloadData.limit)
            options.limit = payloadData.limit
        if (payloadData.skip)
            options.skip = payloadData.skip
            console.log(criteria)
        let momData = await mom.find(criteria, {}, options).populate({
            modal: projects,
            path: 'projectId'
        }).populate({
            modal: client,
            path: 'sharedWith'
        })
        let momCount = await mom.find(criteria).count()
        return res.status(200).json({
            momData: momData,
            count: momCount
        })
    } catch (error) {
        return res.status(400).json({
            message: "Error",
            error: error
        })
    }
}
const deleteMOMs = async(req,res,next)=>{
    try {
        let payloadData = req.body
        let criteria ={

        }
        if(payloadData.momIds)
        criteria._id = {$in : payloadData.momIds}

        let del = await mom.updateMany(criteria,{isDeleted : true},{new : true})
   if(del)
    return res.status(200).json({
        message :"Success"
    })
    else 
    return res.status(203).json({
        message :"Something Went Wrong"
    })
        
    } catch (error) {
        return res.status(400).json({
            message: "Error",
            error: error
        })
    }
}
module.exports = {
    addEditMOM,
    getMOM,
    deleteMOMs
};