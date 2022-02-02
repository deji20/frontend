import Image from "next/image"
import { Component, ReactElement } from "react"

interface HeroImageProperties{
    images: string[];
    children: ReactElement;
}
interface HeroImageState{
    position: number;
    image: string;
}

export default class HeroImage extends Component<HeroImageProperties, HeroImageState>{
    position = 0;
    constructor(props: HeroImageProperties){
        super(props);
        this.state = {
            position: 0,
            image: props.images[0],
        }
        this.imageScroller = this.imageScroller.bind(this);
    }

    imageScroller(){
        this.setState({
                image: this.props.images[++this.position]
            });
    }


    render(){
        let scroller = this.props.images.map((scroll, index) => {
            return <div key={index} className="rounded-full p-1 mx-1 bg-gray-200 bg-opacity-5 hover:bg-opacity-90 transform duration-500 hover:scale-125"></div>
        });

        return (
            <div className="relative h-full w-full shadow-2xl">
                <div className="absolute w-full h-full">
                    <div className="relative h-full w-full -z-1">
                        <Image className="bg-gray-900 bg-opacity-90 bg-blend-hard-light w-min" src={this.state.image || "/assets/blankImage.svg"} alt="Hero Image" layout="fill" objectPosition="50% 50%" objectFit="contain"/>
                    </div>
                </div>
                {this.props.children}
                <div className="absolute w-full flex justify-center top-2 z-10" onClick={this.imageScroller}>
                    {scroller}
                </div>
            </div>
        )
    }
}