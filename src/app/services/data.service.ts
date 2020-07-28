import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {PageParamsInterface} from '../interfaces/page-params.interface';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  structure = '/Structure';
  dictionary = '/Dictionary';
  catalogue = '/Catalogue';

  defaultParams: PageParamsInterface = {
    sort: 'Name',
    page: 1,
    show: 10,
    type: 'Tile'
  };
  siderCollapsed = true;

  constructor(public db: AngularFireDatabase) {
  }

  getHierarchy(name?: string): Observable<any> {
    return (name) ? this.db.list(this.structure, ref => ref.orderByChild('/name').equalTo(name)).valueChanges()
      : this.db.list(this.structure).valueChanges();
  }

  getDictionary(name: string): Observable<any> {
    return this.db.list(this.dictionary, ref => ref.orderByChild('/name').equalTo(name)).valueChanges();
  }

  transliterate(str) {
    const sp = '_';
    const text = str.toLowerCase();
    const transl = {
      \u0430: 'a', \u0431: 'b', \u0432: 'v', \u0433: 'g', \u0434: 'd', \u0435: 'e', \u0451: 'e', \u0436: 'zh',
      \u0437: 'z', \u0438: 'i', \u0439: 'j', \u043a: 'k', \u043b: 'l', \u043c: 'm', \u043d: 'n', \u043e: 'o',
      \u043f: 'p', \u0440: 'r', \u0441: 's', \u0442: 't', \u0443: 'u', \u0444: 'f', \u0445: 'h', \u0446: 'c',
      \u0447: 'ch', \u0448: 'sh', \u0449: 'shch', \u044a: '\'', \u044b: 'y', \u044c: '', \u044d: 'e', \u044e: 'yu',
      \u044f: 'ya',
      '\u00AB': '_', '\u00BB': '_', // «»
      ' ': sp, _: sp, '`': sp, '~': sp,
      '!': sp, '@': sp, '#': sp, $: sp,
      '%': sp, '^': sp, '&': sp, '*': sp, '(': sp, ')': sp, '-': sp, '\=': sp,
      '+': sp, '[': sp, ']': sp, '\\': sp, '|': sp, '/': sp, '.': sp, ',': sp,
      '{': sp, '}': sp, '\'': sp, '"': sp, ';': sp, ':': sp, '?': sp, '<': sp,
      '>': sp
    };
    let result = '';
    let currentSim = '';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < text.length; i++) {
      if (transl[text[i]] !== undefined) {
        if (currentSim !== transl[text[i]] || currentSim !== sp) {
          result += transl[text[i]];
          currentSim = transl[text[i]];
        }
      } else {
        result += text[i];
        currentSim = text[i];
      }
    }
    result = result.replace(/^_/, '').replace(/_$/, ''); // trim
    return result;
  }
}

