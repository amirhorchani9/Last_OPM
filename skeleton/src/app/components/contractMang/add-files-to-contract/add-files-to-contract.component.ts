import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/services/backend.service';
import Observer from 'src/app/services/observer';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-files-to-contract',
  templateUrl: './add-files-to-contract.component.html',
  styleUrls: ['./add-files-to-contract.component.scss']
})
export class AddFilesToContractComponent implements OnInit {
  @Input() title;
  @Input() add;
  @Input() _id;

  FilelistsContratSigne: any;
  FilelistsMatriceDescalade: any;

  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,
    private backendService: BackendService,
    public router: Router
  ) { }

  ngOnInit() {
    // alert(this._id)
  }

  Onsubmit(f: NgForm) {
    let data = new FormData();
    if (this.FilelistsContratSigne) {
      for (let index = 0; index < this.FilelistsContratSigne.length; index++) {
        data.append("contratSigneFiles", this.FilelistsContratSigne[index]);
      }
    }
    if (this.FilelistsMatriceDescalade) {
      for (let index = 0; index < this.FilelistsMatriceDescalade.length; index++) {
        data.append("matriceDescaladeFiles", this.FilelistsMatriceDescalade[index]);
      }
    }
    data.append("_id", this._id);

    this.backendService.post(`${environment.apiUrl}/contract/addlistFileContract`, data)
      .subscribe(new Observer(
        this.router,
        null,
        true, // reload
        true, // sweet alert
        this.sharedService,
        this.activeModal
      ).OBSERVER_POST());
  }
}
