const User = require('../Model/User')

const PostData = async(req,res)=> {
    const users = new User({
        ...req.body
    })
    await users.save()
    .then(()=>{
        res.json("Saved Successfully")
    })
    .catch(()=>{
        res.json("Something Went Wrong")
    })

}

const GetData = async(req,res)=>{
    const Getuser = await User.find({})
    res.json(Getuser)
}

const UpdateData =async(req,res) => {
    
  const{name,age,city }= req.body;

  try {
      const update = await User.findOneAndUpdate(
          { _id: req.params.id },
          {name,age,city  },
          { new: true } 
          
      );
      
    
      if (!update) {
          return res.status(404).json({ message: 'Data not found or unauthorized' });
      }

      res.json({ message: 'Data updated successfully', data: update });
  } catch (error) {
      res.status(500).json({ message: 'Error updating data' });
  }
}

const DeleteData = async(req,res) =>{
    
    try {
        const deletedData= await User.findByIdAndDelete(req.params.id);

        
        if (deletedData) {
           return res.json({ message: 'Data deleted successfully' });
            
        }
  
        
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data' });
    }
  }


module.exports={PostData,GetData,UpdateData,DeleteData}