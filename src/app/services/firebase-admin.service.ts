import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class FirebaseAdminService {
  dictionary;
  structure;
  data;

  constructor(private db: AngularFireDatabase) {
    this.dictionary = db.list('Dictionary');
    this.structure = db.list('Structure');
    db.list('Catalogue').valueChanges().subscribe(res => this.data = res);
  }

  createDictionary() {
    const distinct = (value, index, self) => (self.indexOf(value) === index);
    const category1 = this.data.map(d => d['Category 1']).filter(distinct);
    this.dictionary.remove();
    category1.forEach(c1 => {
      const category2 = this.data
        .filter(d => d['Category 1'] === c1)
        .map(d => d['Category 2'])
        .filter(distinct);
      category2.forEach(c2 => {
        const category3 = this.data
          .filter(d => (d['Category 1'] === c1) && (d['Category 2'] === c2))
          .map(d => d['Category 3'])
          .filter(distinct);
        category3.forEach(c3 => {
          this.data
            .filter(d => (d['Category 1'] === c1) && (d['Category 2'] === c2) && (d['Category 3'] === c3))
            .map(d => d['Category 4'])
            .filter(distinct)
            .forEach(d => {
              if (d !== '') {
                this.dictionary.push({
                  name: this.transliterate(d),
                  origin: d,
                  structure: d
                });
              }
            });
          if (c3 !== '') {
            this.dictionary.push({
              name: this.transliterate(c3),
              origin: c3,
              structure: c3
            });
          }
        });
        if (c2 !== '') {
          this.dictionary.push({
            name: this.transliterate(c2),
            origin: c2,
            structure: c2
          });
        }
      });
      this.dictionary.push({
        name: this.transliterate(c1.substring(4)),
        origin: c1,
        structure: c1.substring(4)
      });
    });
    console.log('Dictionary has been created!');
    return;
  }

  createHierarchy() {
    const distinct = (value, index, self) => (self.indexOf(value) === index);
    const category1 = this.data.map(d => d['Category 1']).filter(distinct);
    this.structure.remove();
    category1.forEach(c1 => {
      const object1 = {name: c1.substring(4), children: []};
      const category2 = this.data
        .filter(d => d['Category 1'] === c1)
        .map(d => d['Category 2'])
        .filter(distinct);
      category2.forEach(c2 => {
        const object2 = {name: c2, children: []};
        const category3 = this.data
          .filter(d => (d['Category 1'] === c1) && (d['Category 2'] === c2))
          .map(d => d['Category 3'])
          .filter(distinct);
        category3.forEach(c3 => {
          const object3 = {name: c3, children: []};
          object3.children = this.data
            .filter(d => (d['Category 1'] === c1) && (d['Category 2'] === c2) && (d['Category 3'] === c3))
            .map(d => d['Category 4'])
            .filter(distinct)
            .map(d => ({name: d}));
          object2.children.push(object3);
        });
        object1.children.push(object2);
      });
      this.structure.push(object1);
    });
    console.log('Hierarchy has been created!');
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
