import { Condo } from "./condo.interface";
import { ServiceInterface } from "./service.interface";
export interface CondoServiceItemInterface {
    condo:Condo,
    services:ServiceInterface[]
}
