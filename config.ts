class config{
    api: string;
    port: number;
    imageApi: string;

    constructor(){
        this.api = process.env.API || process.env.NEXT_PUBLIC_API || "";
        this.imageApi = process.env.NEXT_PUBLIC_IMAGE_API || process.env.API || "";
        this.port = parseInt(process.env.PORT || "8080");
    }
}

export default new config()