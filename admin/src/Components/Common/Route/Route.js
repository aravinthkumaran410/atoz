import Home from "../../Pages/Home/Home";
import ManageOneWay from "../../Pages/Manage/Service/OneWay/ManageOneWay";
import ManageRoundWay from "../../Pages/Manage/Service/RoundWay/ManageRoundWay";
import Oneway from "../../Pages/Service/One-way/Oneway";
import Roundway from "../../Pages/Service/Round-way/Roundway";




const route=[
    {path:"/",element:<Home/>},
    {path:"/trip/oneway",element:<Oneway/>},
    {path:"/trip/round",element:<Roundway/>},
    {path:"/manage/trip/oneway",element:<ManageOneWay/>},
    {path:"/manage/trip/round",element:<ManageRoundWay/>},
]


export default route;