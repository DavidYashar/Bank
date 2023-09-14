import { useLocation } from "react-router-dom";


const Home = () => {

    const location = useLocation()
    return ( 
        <div className="home">
            <h2>Welcome {location.state.id} </h2>
        </div>
     );
}
 
export default Home;
