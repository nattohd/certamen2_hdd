import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Feriado } from 'src/model/feriado';

@Injectable()
export class FeriadosService {

    constructor(private readonly configService: ConfigService) {
    }


    async getFeriados(): Promise<Feriado[]> {
        let url: string = this.configService.get<string>("ENDPOINT_FERIADOS");
        let res = await axios.get(url);
        let data = res.data;

        //let feriados = data.result
        return data.map(f => {
            let isIrrenunciable: string = f.irrenunciable === "0" ? "no" : "si";
            return { nombre: f.nombre, fecha: f.fecha, irrenunciable: isIrrenunciable }
        })
    }

    async getFeriadosIrrenunciables(): Promise<Feriado[]> {
        let url: string = this.configService.get<string>("ENDPOINT_FERIADOS");
        let res = await axios.get(url);
        let data = res.data;
        let feriadosIrrenunciables = data
            .filter(f => f.irrenunciable === "1")
            .map(f => ({
                nombre: f.nombre,
                fecha: f.fecha,
                irrenunciable: "si"
            }));

        return feriadosIrrenunciables;
    }


}
