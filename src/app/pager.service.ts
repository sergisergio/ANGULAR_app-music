import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagerService {
  pageSize: number = 10;
  maxTotalPageShow: number = 10;

  constructor() { }
  setPageSize(pageSize: number) {this.pageSize = pageSize;}
  setMaxTotalPageShow(maxTotalPageShow: number) {this.maxTotalPageShow = maxTotalPageShow;}

  getPager(totalItems: number, currentPage: number = 1) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / this.pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= this.maxTotalPageShow) {
      // less than maxTotalPageShow (default: 10) total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= (Math.trunc(this.maxTotalPageShow / 2) + 1)) {
        startPage = 1;
        endPage = this.maxTotalPageShow;
      } else if (currentPage + (Math.trunc(this.maxTotalPageShow / 2) - 1) >= totalPages) {
        startPage = totalPages - this.maxTotalPageShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.trunc(this.maxTotalPageShow / 2);
        if(this.maxTotalPageShow % 2 === 0){
          endPage = currentPage + Math.trunc(this.maxTotalPageShow / 2) - 1;
        } else {
          endPage = currentPage + Math.trunc(this.maxTotalPageShow / 2);
        }
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * this.pageSize;
    let endIndex = Math.min(startIndex + this.pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: this.pageSize,
      maxTotalPageShow: this.maxTotalPageShow,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
