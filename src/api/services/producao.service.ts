import { IProducaoService } from "@/domain/service/producao.service";
import { Injectable } from "@nestjs/common";
import { IPaginationOptions, IPaginationMeta, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class ProducaoService implements IProducaoService {
    paginate<T>(options: IPaginationOptions<IPaginationMeta>, query: any): Promise<Pagination<T, IPaginationMeta>> {
        return null;
    }
}