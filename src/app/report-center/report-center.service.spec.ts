import { TestBed, inject } from '@angular/core/testing';

import { ReportCenterService } from './report-center.service';

describe('ReportCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportCenterService]
    });
  });

  it('should be created', inject([ReportCenterService], (service: ReportCenterService) => {
    expect(service).toBeTruthy();
  }));
});
