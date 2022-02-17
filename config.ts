class config{
    api: string;
    port: number;


    constructor(){
        this.api = process.env.API || process.env.NEXT_PUBLIC_API || "";
        this.port = parseInt(process.env.PORT) || 8080;
    }
}

export default new config()