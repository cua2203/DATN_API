import { injectable } from 'tsyringe';
import { ProductRepository } from '../repositories/productRepository';
import Excel from 'exceljs';
import * as ExcelJS from 'exceljs';
import path from 'path';

@injectable()
export class ProductService {
  constructor(private product: ProductRepository) {}

  async getAll(): Promise<any> {
    return this.product.getAll();
  }
  async getAllwithVariants(id: any): Promise<any> {
    return this.product.getAllwithVariants(id);
  }

  async getById(id: string): Promise<any> {
    return this.product.getById(id);
  }
  async delete(id: string): Promise<any> {
    return this.product.delete(id);
  }
  async add(laptop: any): Promise<any> {
    return this.product.add(laptop);
  }
  async update(laptop: any): Promise<any> {
    return this.product.update(laptop);
  }

  async export(): Promise<any> {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Laptop List');

    const laptop = await this.product.getAll();
    console.log(laptop);
    worksheet.columns = [
      { key: 'id', header: 'laptop_id' },
      { key: 'laptop_name', header: 'laptop_name ' },
      { key: 'description', header: 'description' },
      { key: 'image', header: 'image' },
      { key: 'category_name', header: 'category_name' },
      { key: 'brand_name', header: 'brand_name' },
    ];
    worksheet.columns.forEach((sheetColumn) => {
      sheetColumn.font = {
        size: 12,
      };
      sheetColumn.width = 30;
    });

    worksheet.getRow(1).font = {
      bold: true,
      size: 13,
    };

    laptop.forEach((item: any) => {
      worksheet.addRow(item);
    });

    const exportPath = path.resolve('File', `${Date.now()}_laptop.xlsx`);

    await workbook.xlsx.writeFile(exportPath);
  }

  async readExcelData(filePath: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet: any = workbook.getWorksheet(1);
    const data: any = [];

    worksheet.eachRow((row: any, rowNumber: any) => {
      if (rowNumber !== 1) {
        // Bỏ qua dòng tiêu đề
        data.push(row.values);
      }
    });
    console.log(data);

    for (const row of data) {
      const [col1, col2, col3, col4, col5, col6, col7] = row; // Thay thế bằng cấu trúc cột thực tế của bạn
      {
      }

      console.log(
        JSON.stringify({
          laptop_name: col3,
          description: col4,
          image: col5,
          category_id: col6,
          brand_id: col7,
        }),
      );
      await this.product.add(
        JSON.stringify({
          laptop_name: col3,
          description: col4,
          image: col5,
          category_id: col6,
          brand_id: col7,
        }),
      );
    }
  }
}
