const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'f16b1e1b62754a52aa9763fc3bada49a'
   });

  const handleApiCall = (req,res)=>{ 
      app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json("unable to work with API might be slow internet connection"))
    }

const handleImage = (req,res,db) =>{
    const { id } = req.body;
    db('users')
.where('id', '=', id)
 .increment('entries',1)
.returning('entries')
.then(entries =>{
    res.json(entries[0]);
})
.catch(ree =>res.status(400).json("enable to count"));
}

module.exports = {
    handleImage:handleImage,
    handleApiCall:handleApiCall
}