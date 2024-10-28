import Home from "../../Pages/Home/Home";
import ManageOneWay from "../../Pages/Manage/Service/OneWay/ManageOneWay";
import ManageRoundWay from "../../Pages/Manage/Service/RoundWay/ManageRoundWay";
import ManageStatePermit from "../../Pages/Manage/StatePermit/ManageStatePermit";
import Oneway from "../../Pages/Service/One-way/Oneway";
import Roundway from "../../Pages/Service/Round-way/Roundway";
import StatePermit from "../../Pages/StatePermit/StatePermit";
import TaxiBooking from "../../Pages/Manage/TaxiBooking/TaxiBooking";
import Contactadmin from "../../Pages/Manage/Contact/ContactAdmin";




const route=[
    {path:"/",element:<Home/>},
    {path:"/trip/oneway",element:<Oneway/>},
    {path:"/trip/round",element:<Roundway/>},
    {path:"/manage/trip/oneway",element:<ManageOneWay/>},
    {path:"/manage/trip/round",element:<ManageRoundWay/>},
    {path:"/statepermit",element:<StatePermit/>},
    {path:"/manage/statepermit",element:<ManageStatePermit/>},
    { path: "/manage/taxibooking", element: <TaxiBooking /> },
  { path: "/manage/contact", element: <Contactadmin /> },
]


export default route;