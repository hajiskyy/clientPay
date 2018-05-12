import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from 'rxjs';
import { Company } from "../models/company";

@Injectable()
export class CompanyService {
  company: Observable<Company[]>
  companyCol: AngularFirestoreCollection<Company>;
  companyDoc: AngularFirestoreDocument<Company>;

  constructor(
    public db: AngularFirestore
  ) { }

  getCompany(name: string){
    this.companyCol = this.db.collection('company', ref => {
      return ref.where("name", "==", name).limit(1);
    });
    this.company = this.companyCol.valueChanges()
    return this.company;
  }

  getCompanybyEmail(email: string){
    this.companyCol = this.db.collection('company', ref => {
      return ref.where("email", "==", email).limit(1);
    });
    this.company = this.companyCol.valueChanges()
    return this.company;

  }

  addCompany(newCompany: Company){
    this.companyCol.add(newCompany)
  }

}
