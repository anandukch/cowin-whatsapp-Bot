const instance=require('./api');

const getStatesId=async(state)=>{
    try {
        if(state!=''){

            let states=await instance.get('admin/location/states/');
            let s=states.data.states.filter(e=>{
                r=e.state_name.replace(/\s/g, "").toLowerCase();
                return r==state.toLowerCase()
            })
            
            return s[0].state_id
        }else{
            return undefined;  
        }
        
    } catch (error) {
        return new Error('err'+error)
    }
}
const getDistrictId=async(dis,id)=>{
    try {
        const res= await instance.get(`admin/location/districts/${id!=undefined?id:'17'}`)
        // console.log(res.data.districts);
        let s=res.data.districts.filter(e=>{
            r=e.district_name.replace(/\s/g, "").toLowerCase();
            return r==dis.toLowerCase()
        })
        console.log(s[0].district_id);
        return s[0].district_id
        // return (res.data.districts)
    } catch (error) {
        console.log('invalid 😓');
    }
}
async function getcalenderByPin(pin, date){
    try {
        const r=await instance.get(`appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
        // console.log(r.data.centers);
        var w=[];
        for(i of r.data.centers){
            for(j of i.sessions){
                if(j.available_capacity>0){
                    w.push(i)
                }
            };
        }
    
        if(w.length>0){
            
            return {
                stateExist:true,
                msg:w
            }
        }else{
            return {
                stateExist:false,
                msg:'no slot 😓',
            }
            
        }
    } 
    catch (error) {
        return {
                    stateExist:false,
                    msg:'pincode not found 😓',
                }
    }
}
const getcalenderByDistrictId=async(id, date)=>{
    
    try {
        let r=await instance.get(`appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${date}`)
        console.log(r.data.centers.length);
    
        var w=[];
        for(i of r.data.centers){
            for(j of i.sessions){
                if(j.available_capacity>0){
                    w.push(i)
                }
            };
        }
        
        if(w.length>0){
            
            return {
                stateExist:true,
                msg:w,
            }
        }else{
            return {
                stateExist:false,
                msg:'not slot 😓',
            }
            
        }
    } catch (error) {
        console.log('server error 🥵');
    }
    
   
}



function getsession(sessions){
    let d="";

    let le=sessions.length
    
    for(let i=0;i<le;i++){
            if(sessions[i].available_capacity>0){
    
                    d+=`
                ----date:  ${sessions[i].date}
                    ---Age limit:  ${sessions[i].min_age_limit}
                    ---vaccine:  ${sessions[i].vaccine}
                    ---dose1:  ${sessions[i].available_capacity_dose1}
                     ---dose2:  ${sessions[i].available_capacity_dose2}
                     
                    `
                break
        }
        if (i==le-1) {
             break;
                   }}
    
    return d
}
function getresult(msg){
    let p=" ";
    let l=msg.length
    console.log(msg[1]);
    console.log(l);
    if (l>0) {
        for(i=0;i<3;i++){
    
            p+=`
    ####### Available #########
        Location: ${msg[i].name}
        Pincode: ${msg[i].pincode}
        Fee_type: ${msg[i].fee_type}
        details: ${getsession(msg[i].sessions)}
        `
        // details: ${getsession(msg[i].sessions)}
            if (i==l-1) {
                break;
            }
        }
        p+=`the bot can only display 3 slots 😏😏.
           
           There are  ${l-3==0?'no':l-3} remaining free slots available.
           Check (https://www.cowin.gov.in/home)
            `
    }else{
        p+=`NO slot`
    }
    
    return p

}
function gethelp(){
    let p=`
    *******WELCOME TO COWIN-WHATSAPP-BOT***😁😁😁****
    _______________________
    How to work with it:
           commands available--
    1) /check-by-pin
        eg: /check-by-pin {pincode} {date}
    2) /check-by-dis
         eg: /check-by-dis {district-name} {date}
        NOTE: Replace all { } with your input
            more featues added soon  
    `;
    return p
}
async function filteredCenters(cmd,info,date){
    
    try {
        if (cmd=='/help') {
            return gethelp()
        }
        if (cmd=='/check-by-pin') {
        
             let s=await getcalenderByPin(info,date)
                
             if (s.stateExist) {
                 let y=getresult(s.msg)
                // console.log(y);
                return y
             }else{
                return s.msg
             }
             
              
            }
        if (cmd=='/check-by-dis') {
            let pin=await getDistrictId(info)

                let s=await getcalenderByDistrictId(pin,date)
                if (s.stateExist) {
                   let y=getresult(s.msg)
                
                return y 
                }else{
                    return s.msg
                }
                
                 
               }   
    } catch (error) {
        return " some error occured "
    }
    
}


module.exports=async function responseHandler(message){
    try {
        let processedMsg=message.split(' ')
    const [cmd , info , date ]=processedMsg

    let y =await filteredCenters(cmd,info,date)
    return y
    } catch (error) {
        return "make sure your message is spelled correct or try again later"
    }
    
 
}




