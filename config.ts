class config{
    api: string;
    port: number;


    constructor(){
        this.api = process.env.API || process.env.NEXT_PUBLIC_API || "";
        this.port = process.env.PORT;
    }
}

export default new config()