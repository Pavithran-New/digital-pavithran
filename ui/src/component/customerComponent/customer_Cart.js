import React, { useEffect, useState } from "react";
import { Cart } from "../cartPage";
import pot from '../../images/Pot.png'
import { Header } from "../header_footer/header";
import axios from "axios";
import { Backend_url } from "../../constant";

export const Cartpage_cus = () => {
    const [getData1 , setgetData1] = useState({})
    const getData = () =>{
       const data = axios.get(`${Backend_url}/api/admin/getProduct`).then((res)=>setgetData1(res.data))
    console.log('X',getData1); 
    }
    
    useEffect(()=>{
        getData();
    },[])
    const imgg = [
        {img:pot},
        {img:pot}
    ]
    
    return (
        <div>
            <div>
                <Header label={'Order'} />
            </div>
            <div className="mt-3 col-sm-6" style={{ display:"flex"}}>
                {getData1 && getData1.length> 0 ? getData1.map((value,key) =>(<div><p>{console.log(`${Backend_url}/api/admin/image/${value.imgName}`)}</p><Cart key={key+1} img={`${Backend_url}/api/admin/image/${value.imgName}`} btnvalue={'Buy'} imgprice={'200'}   imgname={value.product_name} /></div>)):<p>No Produvt Have</p>}
            </div>
        </div>
    )

}