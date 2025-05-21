export class Test {
  private readonly id: number;
  private readonly name: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
