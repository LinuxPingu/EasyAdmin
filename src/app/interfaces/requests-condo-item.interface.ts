import { Condo } from './condo.interface';
import { RequestsInterface } from './requests.interface';
export interface RequestsCondoItemInterface {
    condo:Condo,
    requests:RequestsInterface[]
}
