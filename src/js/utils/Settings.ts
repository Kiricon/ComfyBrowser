const Config = require('electron-config');
const config = new Config();

export class Settings {


  public static setVisted(url:string):void{

    this.incrementVisit(url);
    this.addToHistory(url);

  }

  //Increment our visit counter
  private static incrementVisit(url: string):void{

    let formatUrl: string = url.replace(/\./g,'');
    console.log(formatUrl);
    let key : string = "VisitNumbers."+ formatUrl;

    if(config.has(key)){
      let visitNo: number = config.get(key);
      visitNo++;
      config.set(key, visitNo);
    }else{
      config.set(key, 1);
    }

  }

  //Add a url to our history
  private static addToHistory(url):void{
    if(config.has("History")){
      let history = config.get("History");
      history.push(url);
      config.set("History");
    }else{
      config.set("History", [url]);
    }
  }

  //Get any value form the config
  public static getValue(key: string):any{
    if(config.has(key)){
      return config.get(key);
    }else{
      return "Key does not exist";
    }
  }
}
