import Footer from "./footer";
import Img from "./image";
import NavigationBar from "./navigation/navigationBar";

interface FrameProps{
    children?: JSX.Element | JSX.Element[];
}

export default function Frame(props: FrameProps){
    return (
        <div className="flex flex-col min-h-screen min-w-screen">
            <NavigationBar/>
                {props.children}
            <Footer/>
        </div>
    )
} 