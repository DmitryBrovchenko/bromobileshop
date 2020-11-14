import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})

export class FirebaseAdminService {
  dictionary;
  structure;
  data;

  constructor(private db: AngularFireDatabase, private util: UtilService) {
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
                  name: this.util.transliterate(d),
                  origin: d,
                  structure: d
                });
              }
            });
          if (c3 !== '') {
            this.dictionary.push({
              name: this.util.transliterate(c3),
              origin: c3,
              structure: c3
            });
          }
        });
        if (c2 !== '') {
          this.dictionary.push({
            name: this.util.transliterate(c2),
            origin: c2,
            structure: c2
          });
        }
      });
      this.dictionary.push({
        name: this.util.transliterate(c1.substring(4)),
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
}
