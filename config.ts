class config{
    api: string;
    port: number;


    constructor(){
        this.api = process.env.NEXT_API || process.env.NEXT_PUBLIC_API;
        this.port = process.env.PORT;
    }
}

export default new config()