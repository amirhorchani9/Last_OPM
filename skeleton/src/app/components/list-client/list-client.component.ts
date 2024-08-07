import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/services/backend.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/services/shared.service';
import Observer from 'src/app/services/observer';
import { data } from 'jquery';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {
  dtOptions: any = {};
  image: any;
  listuset: any = [];

  constructor(
    private backendService: BackendService,
    public sharedService: SharedService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  async ngOnInit() {
    this.dtOptions = {
      ajax: {
        url: `${environment.apiUrl}/tech/getlisttechncian`,
        dataSrc: 'rows'
      },
      columns: [
        {
          title: 'Profile',
          data: 'image',
          render: function(data, type, full, meta) {
            return `
              <div class="profile-container">
                <img src="${environment.apiUrl}/uploads/${data.fileName}" alt="Image" width="70" height="70" class="profile-image">
                <div class="profile-name">${full.firstName} ${full.lastName}</div>
              </div>
            `;
          }
        },
        // {
        //   title: 'Image',
        //   data: 'image',
        //   render: function(data, type, full, meta) {
        //     if (data && data.fileName) {
        //       return `<img src="${environment.apiUrl}/uploads/$ {data.fileName}" alt="Image" width="70" height="70">`;
        //     }
        //     return 'No Image';
        //   }
        // },
        // {
        //   title: 'Name',
        //   render: function(data, type, full, meta) {
        //     return `${full.firstName} ${full.lastName}`;
        //   }
        // },
        { title: 'Email', data: 'email' },
        {
          title: 'Passport',
          render: function(data, type, full, meta) {
            return full.passeport ? 'Yes' : 'No';
          }
        },
        {
          title: 'Expiration date',
          render: function(data, type, full, meta) {
            return full.passeport ? full.ExpiredAt : '___';
          }
        },
        {
          title: 'Driver license',
          render: function(data, type, full, meta) {
            return full.permisConduire ? 'Yes' : 'No';
          }
        },
        {
          title: 'Status',
          render: (data, type, full, meta) => {
            return this.getStatusSwitch(full);
          }
        }
      ],
      dom: 'Bfrtip',
      buttons: ['copy', 'print', 'excel', 'csv']
    };
  }

  getStatusSwitch(full) {
    if (full.valid) {
      return `
      <div class="form-group">
        <div class="switch switch-success d-inline m-r-10">
          <input type="checkbox" id="switch-${full._id}" ${full.valid ? 'checked' : ''}>
          <label for="switch-${full._id}" class="cr"></label>
        </div>
        <label>${full.valid ? 'Enable' : 'Disable'}</label>
      </div>
    `;
    } else {
      return `
      <div class="form-group">
        <div class="switch switch-danger d-inline m-r-10">
          <input type="checkbox" id="switch-${full._id}" ${full.valid ? 'checked' : ''}>
          <label for="switch-${full._id}" class="cr"></label>
        </div>
        <label>${full.valid ? 'Enable' : 'Disable'}</label>
      </div>
    `;
    }
  }

  ngAfterViewInit() {
    $('#dataTable').on('click', '.fa-eye', (event) => {
      const id = $(event.target).data('id');
      this.opendetailes(id);
    });
    $('#dataTable').on('change', 'input[type="checkbox"]', (event) => {
      const id = $(event.target).attr('id').replace('switch-', '');
      const checked = $(event.target).prop('checked');
      this.onCheckboxChange(id, checked);
    });
  }

  opendetailes(_id) {
    this.router.navigate(['/test/folderDerailes/detailes', _id]);
  }

  onCheckboxChange(itemId: string, checked: boolean) {
    this.changeStatCompte(itemId, checked);
  }

  changeStatCompte(id, etat) {
    const payload = { _id: id, valid: etat };
    this.backendService
      .put(`${environment.apiUrl}/tech/updateStatTech`, payload)
      .subscribe(new Observer(
        this.router,
        null,
        true,
        true,
        this.sharedService,
        null
      ).OBSERVER_PUT());
  }
}
