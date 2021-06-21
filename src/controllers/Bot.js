
// const google=require('googleapis').google;
const dotenv=require('dotenv');
const twilio=require('twilio')
dotenv.config();
const responseHandler=require('./apis/process')


twilio(process.env.TWILIO_ACCOUNT,process.env.TWILIO_TOKEN);
const { MessagingResponse } =twilio.twiml
// const customsearch = google.customsearch('v1');
// const cx=process.env.GSEARCHAPI;
class Bot{

    /**
   * @memberof Bot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
  static async search(req,res,next){
      
      const tw=new MessagingResponse();
      const message=req.body.Body;
      console.log(message);
     
    
  try{
    let result=await responseHandler(message)
    console.log(result);
    
    if(result!=undefined){
        tw.message(result)
    }else{
      tw.message('make sure your message is spelled correct or try again later');
    }
    
      res.set('Content-Type', 'text/xml');
      return res.status(200).send(tw.toString());

  }catch(err){
      return next(err)
  }
}


}

module.exports=Bot;
