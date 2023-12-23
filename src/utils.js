const getRequestData = (req) =>{
    return new Promise((resolve,reject)=>{
        try{
            let body = ""
            req.on("data", (chunk)=>{
                body += chunk.toString()
            })
            req.on("end", ()=>{
                resolve(body)
            })
        }catch(error){
            reject(error)
        }
    })
}

const validateNumber = number => {
    try {
      var regex_number = /^[0-9]*$/;
      if (!regex_number.test(number)) {
        return false;
      }
      return true;
    } catch (Exception) {
      console.log(Exception);
      return false
    }
  };

module.exports = {
    getRequestData,
    validateNumber
}