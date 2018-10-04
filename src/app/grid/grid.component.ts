import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { isNullOrUndefined } from 'util';

export interface GridConfig {
  cols: GridColumn[],
  data: any[],
  total?: number,
  paginate?: boolean,
  pageSize?: number,
  pageCount?: number,
  page?: number,
  first?: number,
  globalSearch?: boolean,
  columnSearch?: boolean,
  idColumnHref?: string,
  loading?: boolean
  sortField?: string,
  sortOrder?: string,
  parent?: Object,
  paginateCallback?: string
}
export interface GridColumn {
  header: string,
  field: string,
  search?: boolean,
  sort?: boolean,
  idColumn?: boolean
}
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnDestroy {
  @Input() config: GridConfig;
  @Output() onPaginate = new EventEmitter<any>();
  @Output() onSort = new EventEmitter<any>();

  defaultSortOrder: string = 'asc';
  currentSortOrder: string = '';
  sortColumnIndex: number = 0;
  constructor() { }

  ngOnInit() {
    if (isNullOrUndefined(this.config.first))
      this.config.first = 0;
    if (this.config.sortField) {
      for (let index = 0; index < this.config.cols.length; index++) {
        if (this.config.cols[index].field === this.config.sortField) {
          if (this.config.sortOrder)
            this.currentSortOrder = this.config.sortOrder;
          this.sortColumnIndex = index;
          break;
        }
      }
    }
  }

  ngOnDestroy() {
    this.config.cols = new Array();
    this.config.data = new Array();
  }

  applySort(i) {
    this.config.loading = true;
    this.config.first = 0;
    this.config.page = 0;
    event.preventDefault();
    if (i != this.sortColumnIndex) {
      this.currentSortOrder = this.defaultSortOrder;
      this.sortColumnIndex = i;
    }
    else {
      if (this.currentSortOrder === 'asc')
        this.currentSortOrder = 'desc';
      else if (this.currentSortOrder === 'desc')
        this.currentSortOrder = 'asc';
      else
        this.currentSortOrder = this.defaultSortOrder;
      this.sortColumnIndex = i;
    }
    this.config.sortField = this.config.cols[this.sortColumnIndex].field;
    this.config.sortOrder = this.currentSortOrder;
    this.onSort.emit({
      field: this.config.cols[this.sortColumnIndex].field,
      order: this.currentSortOrder
    });
    if (this.config.parent && this.config.paginateCallback)
      this.config.parent[this.config.paginateCallback]();
    // if (i != this.sortColumnIndex) {
    //   this.currentSortOrder = this.defaultSortOrder;
    //   this.sortColumnIndex = i;
    //   this.sortItems();
    //   return;
    // }
    // if (this.currentSortOrder === 'down')
    //   this.currentSortOrder = 'up';
    // else if (this.currentSortOrder === 'up')
    //   this.currentSortOrder = 'down';
    // else
    //   this.currentSortOrder = this.defaultSortOrder;
    // this.sortColumnIndex = i;
    // this.sortItems();
  }

  sortItems() {
    this.config.data.sort((a, b) => {
      var sortField = this.config.cols[this.sortColumnIndex].field;
      if (a[sortField] < b[sortField])
        return this.currentSortOrder === 'down' ? -1 : 1;
      else if (a[sortField] > b[sortField])
        return this.currentSortOrder === 'down' ? 1 : -1;
      else return 0;
    })
  }

  paginate(event) {
    this.config.loading = true;
    this.config.page = event.page;
    this.config.pageCount = event.pageCount;
    if (this.config.pageSize != event.rows) {
      this.config.page = 0;
      this.config.first = 0;
    }
    else
      this.config.first = event.first;
    this.config.pageSize = event.rows;
    this.onPaginate.emit(event);
    if (this.config.parent && this.config.paginateCallback)
      this.config.parent[this.config.paginateCallback]();
  }

  resetConfig(data: any[], total: number, pages: number) {
    this.config.data = data;
    this.config.total = total;
    this.config.pageCount = pages;
    this.config.loading = false;
  }
}

