import { Expose as JsonProperty, Type } from "class-transformer";

export class Sort {
  public property: string;
  public direction: "ASC" | "DESC" | string;
  constructor(sort: string) {
    if (sort) {
      [this.property, this.direction] = sort.split(",");
    }
  }

  asOrder(): any {
    const order = {};
    order[this.property] = this.direction;
    return order;
  }
}

export class PageRequest {
  @JsonProperty()
  page = 0;
  @JsonProperty()
  size = 20;
  @JsonProperty()
  skip = 0;
  @Type(() => Sort)
  sort: Sort = new Sort("id,ASC");

  constructor(page: number | string, size: number | string, sort: string) {
    this.page = +page > 0 ? +page : 0 || this.page;
    this.size = +size || this.size;
    this.sort = sort ? new Sort(sort) : this.sort;
    this.skip = this.page * this.size;
  }
}

export class Page<T> {
  constructor(
    public content: T[],
    public total: number,
    public pageable: PageRequest
  ) {}
}
