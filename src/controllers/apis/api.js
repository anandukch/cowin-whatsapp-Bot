const dotenv=require('dotenv');
dotenv.config();
const axios=require('axios')


 const instance=axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        accept: "application/json",
        "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
        
    },
})
module.exports=instance


// module.exports={

//     getStatesId:async(state)=>{
//         try {
//             if(state!=''){

//                 let states=await instance.get('admin/location/states/');
//                 let s=states.data.states.filter(e=>{
//                     r=e.state_name.replace(/\s/g, "").toLowerCase();
//                     return r==state.toLowerCase()
//                 })
                
//                 return s[0].state_id
//             }else{
//                 return undefined;  
//             }
            
//         } catch (error) {
//             return new Error('err'+error)
//         }
//     },
//     getDistricts:async(id)=>{
//         try {
//             const res= await instance.get(`admin/location/districts/${id!=''?id:'17'}`)
//             return (res.data.districts)
//         } catch (error) {
            
//         }
//     },
//     getcalenderByPin:async(pin, date)=>{
//         try {
//             const r=await instance.get(`appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
//         // console.log(r);
        
//             if(r.data.centers.length>0){
                
//                 return {
//                     stateExist:false,
//                     msg:r.data.centers
//                 }
//             }else{
//                 return {
//                     stateExist:true,
//                     msg:'no slot',
//                 }
                
//             }
//         } 
//         catch (error) {
//             return {
//                         stateExist:false,
//                         msg:'Something went wrong',
//                     }
//         }
//     },
//     getcalenderByDistrictId:async(id, date)=>{
//         // try {
//         //     const res=await instance.get(`appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${date}`)
//         //     return (res.data.centers)
//         // } catch (error) {
//         //     return error
//         // }
//         instance.get(`appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${date}`).then(r=>{
//             console.log(r.data.centers);
//             if(r.data.centers.length<0){
                
//                 return {
//                     stateExist:false,
//                     msg:'No slot available'
//                 }
//             }else{
//                 return {
//                     stateExist:true,
//                     msg:r.data.centers,
//                 }
                
//             }
//         }).catch(err=>{
//             return {
//                 stateExist:false,
//                 msg:'Not available try later',
//             }
//         })
//     }
   
// }




// getcalenderByDistrictId(301,'17-06-2021')
// instance:instance,
//     stateUrl:'admin/location/states/',
//     districtUrl:'admin/location/districts/',
//     getByPin:'appointment/sessions/public/calendarByPin?pincode=',
//     getByDistId:'appointment/sessions/public/calendarByPin?pincode=',