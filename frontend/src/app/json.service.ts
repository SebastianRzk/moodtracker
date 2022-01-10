import { Injectable } from '@angular/core';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor() { }

  public parseChecklistItems(longText: string) {
    return this.parseMyObject(longText, FUN_DEFAULT_CHECKLIST, this.isCheckList);
  }

  parseMyObject = <T> (text: string, funDefault: () => T, check: (o: any) => o is T): T => {
    if(! text) {
      return funDefault();
    }
    let result = this.safeJsonParse(check)(text);
    if(result.hasError) {
      return funDefault();
    }
    return result.parsed;
  }


  isCheckList(o: any): o is CheckList {
    if (!("elements" in o)){
      return false;
    }
    if (o.elements.length == 0 ) {
      return true;
    }
    for (let index = 0; index < o.elements.length; index++) {
      const element = o.elements[index];
      if(!("name" in element)) {
        return false;
      }
      if(!("checked" in element)) {
        return false;
      }
    }
    return true;
  }

  safeJsonParse = <T>(guard: (o: any) => o is T) => 
    (text: string): ParseResult<T> => {
      const parsed = JSON.parse(text)
      return guard(parsed) ? { parsed, hasError: false } : { hasError: true }
  }

  toJSON = (o: any):string => {
    return JSON.stringify(o);
  }
}


type ParseResult<T> =
  | { parsed: T; hasError: false; error?: undefined }
  | { parsed?: undefined; hasError: true; error?: unknown }

export class CheckList {
  constructor(public elements: CheckListItem[]){}
}

export class CheckListItem {
  constructor(public name: string, public checked: boolean) {}
}

const FUN_DEFAULT_CHECKLIST = () => new CheckList([]);