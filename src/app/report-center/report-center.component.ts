import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../core/base.component';
import { LoginService } from '../login/login.service';
import { ReportCenterService } from './report-center.service';

@Component({
  selector: 'app-report-center',
  templateUrl: './report-center.component.html',
  styleUrls: ['./report-center.component.css']
})
export class ReportCenterComponent extends BaseComponent implements OnInit {

  reports: any = {};
  downloadError: boolean = false;
  downloadErrorText: string = '';
  disableDownload: boolean = false;

  constructor(loginService: LoginService, private service: ReportCenterService) {
    super(loginService);
  }

  ngOnInit() {
    this.reports = [{
      'name': 'Sample Report',
      'description': 'A sample report to demonstrate file download',
      'url': 'sample_report.xlsx',
      'fileName': 'sample_report.xlsx',
      'downloading': false,
      'type': 'application/octet-stream'
    }
    ]
  }

  download(index: number) {
    this.disableDownload = true;
    this.downloadError = false;
    this.downloadErrorText = '';
    event.preventDefault();
    var report = this.reports[index];
    report.downloading = true;
    this.service.download(report.url).subscribe(blobResp => {
      this.disableDownload = false;
      report.downloading = false;
      var blob = new Blob([blobResp], { type: report.type });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = report.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, (error) => {
      this.disableDownload = false;
      report.downloading = false;
      this.downloadError = true;
      this.downloadErrorText = error;
    })
  }
}
