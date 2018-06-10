validateEmail = (email) =>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
validatePassword = (password) => {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(password);
}

const handleRegistration = (req,res,db,bcrypt) =>{
    
    const {email,name,password} = req.body;
  
    if(!email || !name || !password || !(validateEmail(email)) || !(validatePassword(password))){

     return   res.status(400).json("Incorrect form submission");
    }
    const hash = bcrypt.hashSync(password);

   db.transaction(trx => {
       trx.insert({
           hash:hash,
           email:email
           
       })
       .into('login')
       .returning('email')
       .then(loginEmail =>{
        return trx('users').returning('*').insert({
            
            email:loginEmail[0],
            name:name,
           
            joined:new Date()
        }).then(user => {
       
            res.json(user[0]);
        })
       })
       .then(trx.commit)
       .catch(trx.rollback)
   })
.catch(err => res.status(400).json(err));
    
}


module.exports = {
    handleRegistration:handleRegistration
};

