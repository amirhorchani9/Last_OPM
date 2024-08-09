import { Component, OnInit, ViewEncapsulation ,TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'src/app/services/backend.service';
import Observer from 'src/app/services/observer';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.scss',
              '../../../../node_modules/ngx-bar-rating/themes/br-movie-theme.css' 
            ], 
              encapsulation: ViewEncapsulation.None
 
})
export class ListTicketsComponent implements OnInit {
  id_contract ='66b0c515ddbb6fff0da35028';
  listTickets: any = []
  public rateMovie = 1;
  selectedTicket: any;
  // ------
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  term: any;

  constructor(private route: ActivatedRoute, private backendService: BackendService, public sharedService: SharedService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getListTickets()
    // this.id_contract ='66b0c515ddbb6fff0da35028';
  }
  async getListTickets() {
    await this.backendService.get(`${environment.apiUrl}/ticket/getAllTicketByContract/${this.id_contract}`).subscribe(
      new Observer().OBSERVER_GET((response) => {
        this.listTickets = response.rows;
        console.log("list ticket:" , this.listTickets)
      })
    );
  }
  openDetails(ticket: any, content: TemplateRef<any>) {
    this.selectedTicket = ticket;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    console.log(this.selectedTicket)
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;//lorsque la taille de la page est modifie la pagination revient à la page 1
  }
}
