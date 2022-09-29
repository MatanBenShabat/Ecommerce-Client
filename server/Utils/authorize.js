const authorize = (req,result) => {
  return req.body.password === result.password
}

module.exports =  authorize