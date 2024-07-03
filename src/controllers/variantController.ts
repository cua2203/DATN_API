import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { VariantService } from "../services/variantService";
import _ from "lodash";

@injectable()
export class VariantController {
    constructor(private service: VariantService) { }

    async getAllPaging(req: Request, res: Response): Promise<void> {
        try {
            const search_criteria = {
                searchString: req.params.searchString,
                pageIndex: req.params.pageIndex,
                pageSize: req.params.pageSize

            }

            const data = await this.service.getAllPaging(JSON.stringify(search_criteria));
            if (data && data.length > 0) {
                res.json(data);
            } else {
                res.json({ message: "Không lấy được danh sách" });
            }
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }

    async getAllVariant(req: Request, res: Response): Promise<void>{
        try {
            let data = await this.service.getAll();
            
            res.json({message:'success',data:data});
            
        } catch (error: any) {
            res.json({ message: error.message });
            
        }
    }

    async getAllVariantWithoutPrice(req: Request, res: Response): Promise<void>{
        try {
            let data = await this.service.getAllWthPrice();
            
            res.json({message:'success',data:data});
            
        } catch (error: any) {
            res.json({ message: error.message });
            
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {

            const searchString = req.query.searchString?.toString() || '';
            let pageIndex = Number(req.query.pageIndex) || 1;
            let pageSize = Number(req.query.pageSize) || 10;
            const brand = req.query.brand ? (req.query.brand as string):'';
            const category = req.query.category ? (req.query.category as string):'';
            const sort = req.query.sort ? (req.query.sort as string) :'';
            const price = Number(req.query.price);

            console.log(req.query)

        
        
            let data = await this.service.getAll();
    
      
            if (data && data.length > 0) {
             
              switch (sort) {
                case '4': data = _.orderBy(data, 'laptop_name', 'asc'); break;
                case '5': data = _.orderBy(data, 'laptop_name', 'desc'); break;
                case '2': data = _.orderBy(data, 'id', 'desc'); break;
                case '1': data = _.orderBy(data, 'price', 'desc'); break;
                case '0': data = _.orderBy(data, 'price', 'asc'); break;
                default: data = _.orderBy(data, 'id', 'asc'); break;
              }

              switch(price){
                case 1: data = _.filter(data, (item: any) => {return item.price >5000000 && item.price<10000000}); break;
                case 2: data = _.filter(data, (item: any) => {return item.price >10000000 && item.price <20000000}); break;
                case 3: data = _.filter(data, (item: any) => {return item.price >20000000 && item.price <30000000}); break;
                case 4: data = _.filter(data, (item: any) => {return item.price >30000000 && item.price <40000000}); break;
                case 5: data = _.filter(data, (item: any) => {return item.price >40000000}); break;
                default: data = data; break;
            }


           
              console.log(data)

              data = _.filter(data, (item: any) => {
                return searchString!=''
                  ? _.includes(item.laptop_name.toLowerCase(), searchString.toLowerCase())
                  : true;
              });


              if (brand !=='all') {
                data = _.filter(data, (item: any) => brand == item.brand_id);
              }

              if (category !=='all') {
                data = _.filter(data, (item: any) => category == item.category_id);
              }
        
      
              let startIndex = (pageIndex - 1) * pageSize;
              let endIndex = startIndex + pageSize;
              let totalPage =Math.ceil(data.length/pageSize)
              data = data.slice(startIndex, endIndex);
              
          
      
              res.json({data:data,totalPage:totalPage});
            } else {
              res.json({ message: "Không lấy được danh sách" });
            }
          } catch (error: any) {
            res.json({ message: error.message });
          }
    }
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const category = await this.service.getById(id);
            if (category) {
                res.json(category);
            } else {
                res.json({ message: 'Bản ghi không tồn tại' });
            }
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }

    async getByLaptopId(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const category = await this.service.getByLaptopId(id);
            if (category) {
                res.json(category);
            } else {
                res.json({ message: 'Bản ghi không tồn tại' });
            }
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }

    async getNewEst(req: Request, res: Response): Promise<void> {
        try {
            const number = req.params.number;
            const result = await this.service.getNewEst(Number(number));
            if (result) {
                res.json(result);
            } else {
                res.json({ message: 'Bản ghi không tồn tại' });
            }
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }

    async getTopSelling(req: Request, res: Response): Promise<void> {
        try {
            const number = req.params.number;
            const result = await this.service.getTopSelling(Number(number));
            if (result) {
                res.json(result);
            } else {
                res.json({ message: 'Bản ghi không tồn tại' });
            }
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }


    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const category = await this.service.delete(id);
            res.json({ message: "Done!" })
        } catch (error: any) {
            res.json({ message: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const laptop = req.body;
            const results = await this.service.update(JSON.stringify(laptop));

            res.json({ message: 'Đã cập nhật thành công', results: results });
        } catch (error: any) {
            res.json({ message: error.message, results: false });
        }
    }


    async add(req: Request, res: Response): Promise<void> {
        try {
            const laptop = req.body;
            const results = await this.service.add(JSON.stringify(laptop));

            res.json({ message: 'Đã cập nhật thành công', results: results });
        } catch (error: any) {
            res.json({ message: error.message, results: false });
        }
    }
}
