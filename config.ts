class config{
    publicApi: string;
    api: string;
    port: number;


    constructor(){
        this.publicApi = "http://indiskehjørne.dk/api";
        this.api = "http://api";
        this.port = parseInt("80");
    }
}

export default new config()