import { Injectable } from "@nestjs/common";
import { Axios } from "axios";

@Injectable()
export class ExchangeService {
  private instance: Axios;

  initialize() {
  	this.instance = new Axios({
  		timeout: 3000,
  		baseURL: process.env.BROKER_URL,
  	});
  }

  async getData(): Promise<number> {
  	try {
  		this.initialize();
  		let { data } = await this.instance.get("/price?symbol=BTCUSDT");
  		data = JSON.parse(data);
  		return Number(data.price);
  	} catch (error) {
  		console.error(error);
  		return 0;
  	}
  }
}
